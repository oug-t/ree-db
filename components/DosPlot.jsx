"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

const colors = {
  "total-DOS": "#df3d1b",
  "1:total": "#829b4d",
  "2:total": "#050505",
  "3:total": "#fea3ff",
  "1:d": "#305cde",
  "1:f": "#7fffd4",
  "2:d": "#ebbd41",
};

function DOSPlot({ pcd }) {
  const mountRef = useRef(null);
  const parsedDataRef = useRef({});
  const plotsRef = useRef({});

  const [xRange] = useState({ min: -16, max: 12 });
  const [yRange] = useState({ min: 0, max: 16 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeLines, setActiveLines] = useState(
    Object.keys(colors).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
  );

  useEffect(() => {
    if (!pcd) return;

    let isMounted = true;
    let renderer, scene, camera;

    const initPlot = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api.php?path=materials/${pcd}/dos`);
        if (!response.ok)
          throw new Error("DOS data not available for this material.");

        const text = await response.text();
        if (!isMounted) return;

        parseDOS(text);
        ({ renderer, scene, camera } = createScene());
        setIsLoading(false);
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      }
    };

    initPlot();

    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return;
      const parent = mountRef.current.parentElement;
      renderer.setSize(parent.clientWidth, parent.clientHeight);
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleResize);
      if (renderer && mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, [pcd]);

  const parseDOS = (text) => {
    const lines = text.split("\n");
    let headers = [];
    const data = {};

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed.startsWith("#") || trimmed === "") {
        if (trimmed.includes("ENERGY") && headers.length === 0) {
          headers = trimmed.split(/\s+/).slice(1);
          headers.forEach((h) => (data[h] = []));
        }
        continue;
      }

      if (headers.length > 0) {
        const values = trimmed.split(/\s+/).map(Number);
        if (values.length > 1) {
          headers.forEach((header, index) => {
            if (data[header]) data[header].push(values[index]);
          });
        }
      }
    }
    parsedDataRef.current = data;
  };

  const createScene = () => {
    if (!mountRef.current) return {};
    const parentDiv = mountRef.current.parentElement;
    const width = parentDiv.clientWidth;
    const height = parentDiv.clientHeight || 400;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.OrthographicCamera(-18, 18, 9, -14, 0.1, 10000);
    camera.position.set(-2, 9, 50);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    if (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    mountRef.current.appendChild(renderer.domElement);

    const data = parsedDataRef.current;
    plotsRef.current = {};

    for (const v of Object.keys(data)) {
      if (v === "ENERGY" || !colors[v]) continue;

      const points = data["ENERGY"].map(
        (energy, i) => new THREE.Vector2(energy, data[v][i]),
      );

      const geometry = new LineGeometry();
      geometry.setFromPoints(points);

      const material = new LineMaterial({ color: colors[v], linewidth: 1 });
      const line = new Line2(geometry, material);

      plotsRef.current[v] = line;
      scene.add(line);
    }

    const axisMaterial = new LineMaterial({ color: "#000000", linewidth: 1 });
    const xAxisGeom = new LineGeometry().setFromPoints([
      new THREE.Vector2(xRange.min, 0),
      new THREE.Vector2(xRange.max, 0),
    ]);
    const yAxisGeom = new LineGeometry().setFromPoints([
      new THREE.Vector2(xRange.min, yRange.min),
      new THREE.Vector2(xRange.min, yRange.max),
    ]);

    scene.add(new Line2(xAxisGeom, axisMaterial));
    scene.add(new Line2(yAxisGeom, axisMaterial));

    new FontLoader().load("/Roboto_Regular.json", (font) => {
      const textMat = new THREE.MeshPhongMaterial({ color: 0x000000 });

      const xLabel = new THREE.Mesh(
        new TextGeometry("Energy (eV)", {
          font,
          size: 0.5,
          height: 0.5,
        }).center(),
        textMat,
      );
      xLabel.position.set(-2, -3, 0);
      scene.add(xLabel);

      const yLabel = new THREE.Mesh(
        new TextGeometry("Density of States (DOS)", {
          font,
          size: 0.5,
          height: 0.5,
        }).center(),
        textMat,
      );
      yLabel.position.set(-18.5, 7.5, 0);
      yLabel.rotation.z = Math.PI / 2;
      scene.add(yLabel);
    });

    renderer.setAnimationLoop(() => renderer.render(scene, camera));
    return { renderer, scene, camera };
  };

  const toggleLine = (key) => {
    if (plotsRef.current[key]) {
      const isVisible = !activeLines[key];
      plotsRef.current[key].visible = isVisible;
      setActiveLines((prev) => ({ ...prev, [key]: isVisible }));
    }
  };

  if (error) {
    return (
      <div className="w-full flex items-center justify-center h-[400px] bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <p className="text-gray-500 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <div ref={mountRef} className="w-full h-[400px]" />

      {!isLoading && (
        <div className="flex flex-wrap justify-center gap-3">
          {Object.keys(colors).map((key) => (
            <button
              key={key}
              onClick={() => toggleLine(key)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full border transition-colors"
              style={{
                borderColor: colors[key],
                backgroundColor: activeLines[key] ? colors[key] : "transparent",
                color: activeLines[key] ? "#fff" : "#333",
              }}
            >
              {key}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default React.memo(DOSPlot);
