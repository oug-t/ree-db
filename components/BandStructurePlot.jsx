import * as THREE from "three";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import React, { useEffect, useRef, useState, useCallback } from "react";

function BandStructurePlot() {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const [error, setError] = useState(null);
  const [plotData, setPlotData] = useState([]);

  const createBandStructurePlot = useCallback(() => {
    if (!mountRef.current || plotData.length === 0) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight || 500;

    if (width === 0) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.OrthographicCamera(-0.5, 12, 20, -50, 0.1, 10);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    rendererRef.current = renderer;

    mountRef.current.innerHTML = "";
    mountRef.current.appendChild(renderer.domElement);

    plotData.forEach((band) => {
      const points = band.map(
        (coord) => new THREE.Vector2(coord.k * 10, coord.energy),
      );
      const geometry = new LineGeometry();
      geometry.setFromPoints(points);

      const material = new LineMaterial({
        color: "#000000",
        linewidth: 1,
        resolution: new THREE.Vector2(width, height),
      });

      const line = new Line2(geometry, material);
      scene.add(line);
    });

    renderer.render(scene, camera);
  }, [plotData]);

  const parseBandData = (data) => {
    let bands = [];
    let currentBand = [];
    let kPointAccumulator = 0;
    let lastKPoint = null;

    data.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("bandindex:")) {
        if (currentBand.length > 0) bands.push(currentBand);
        currentBand = [];
        kPointAccumulator = 0;
        lastKPoint = null;
      } else if (trimmed.length > 0) {
        const values = trimmed.split(/\s+/).map(Number);
        if (values.length >= 5) {
          const currentKPoint = [values[0], values[1], values[2]];
          const energy = values[4];

          if (lastKPoint) {
            const diff = Math.sqrt(
              Math.pow(currentKPoint[0] - lastKPoint[0], 2) +
                Math.pow(currentKPoint[1] - lastKPoint[1], 2) +
                Math.pow(currentKPoint[2] - lastKPoint[2], 2),
            );
            kPointAccumulator += diff;
          }
          lastKPoint = currentKPoint;

          if (!isNaN(kPointAccumulator) && !isNaN(energy)) {
            currentBand.push({ k: kPointAccumulator, energy });
          }
        }
      }
    });

    if (currentBand.length > 0) bands.push(currentBand);
    return bands;
  };

  useEffect(() => {
    fetch("/Gd1.spaghettiup_ene")
      .then((res) => res.text())
      .then((fileData) => {
        const bands = parseBandData(fileData);
        if (bands.length > 0) {
          setPlotData(bands);
        } else {
          setError("No valid band data found");
        }
      })
      .catch((err) => console.error("Error loading file:", err));
  }, []);

  useEffect(() => {
    createBandStructurePlot();
    const handleResize = () => createBandStructurePlot();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
        rendererRef.current = null;
      }
    };
  }, [createBandStructurePlot]);

  if (error)
    return <div style={{ textAlign: "center", color: "red" }}>{error}</div>;

  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        ref={mountRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    </div>
  );
}

export default React.memo(BandStructurePlot);
