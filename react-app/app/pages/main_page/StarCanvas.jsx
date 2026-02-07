import React, { useEffect, useRef, useState } from "react";

import { getStarSize } from "../../shared/utils/StarSize";
import { getSpectralClass } from "../../shared/utils/SpectralClass";

export const StarCanvas = ({ stars, width = 1000, height = 1000 }) => {
  const canvasRef = useRef();
  const [hoveredStar, setHoveredStar] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    const dpr = window.devicePixelRatio || 1;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const scale = Math.min(width, height) / 2;

      stars.forEach((star) => {
        const x = cx + star.lon * scale;
        const y = cy - star.lat * scale;
        const size = getStarSize(star.mag);

        ctx.fillStyle =
          star === hoveredStar ? "yellow" : getSpectralClass(star.spectral);
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (hoveredStar) {
        ctx.fillStyle = "white";
        ctx.font = "12px sans-serif";
        ctx.fillText(
          hoveredStar.name || "Unnamed",
          (hoveredStar.ra / 360) * width + 5,
          ((90 - hoveredStar.dec) / 180) * height - 5
        );
      }
    };

    draw();
  }, [stars, hoveredStar]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ background: "black" }}
    />
  );
};
