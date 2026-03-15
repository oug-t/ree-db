"use client";

import React, { useEffect, useRef } from "react";

export default function JSmolViewer({ cifText }) {
  const jsmolContainerRef = useRef(null);

  useEffect(() => {
    const initJSmol = () => {
      if (
        typeof window !== "undefined" &&
        window.Jmol &&
        cifText &&
        jsmolContainerRef.current
      ) {
        const Info = {
          width: "100%",
          height: "100%",
          use: "HTML5",
          color: "white",
          j2sPath: "/jsmol/j2s",
          script: `load INLINE "${cifText}" packed; zoom -50;`,
          debug: false,
        };

        const jsmolApplet = window.Jmol.getApplet("jsmolApplet", Info);
        jsmolContainerRef.current.innerHTML =
          window.Jmol.getAppletHtml(jsmolApplet);
      }
    };

    // If Jmol isn't ready, wait 100ms and try again
    if (!window.Jmol) {
      const timer = setTimeout(initJSmol, 200);
      return () => clearTimeout(timer);
    } else {
      initJSmol();
    }
  }, [cifText]);

  return (
    <div className="w-full h-[400px] md:h-[500px] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex items-center justify-center">
      <div
        ref={jsmolContainerRef}
        className="w-full h-full"
        id="jsmol-container"
      ></div>
    </div>
  );
}
