import React, { useEffect, useRef, useState } from "react";

export const StarCanvas = ({ stars, width = 1500, height = 1000 }) => {
  const canvasRef = useRef();
  const [hoveredStar, setHoveredStar] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        const x = (star.ra / 360) * width;
        const y = ((90 - star.dec) / 180) * height;
        // const size = Math.max(0.5, 6 - star.mag);
        const size = Math.max(0, 5 - (star.mag / 6) * 4);

        ctx.fillStyle = star === hoveredStar ? "yellow" : "white";
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

  useEffect(() => {
    const canvas = canvasRef.current;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      // Simple detection: nearest star within radius 5
      const starUnderCursor = stars.find((star) => {
        const x = (star.ra / 360) * width;
        const y = ((90 - star.dec) / 180) * height;
        const size = Math.max(0.5, 6 - star.mag);
        return Math.hypot(mx - x, my - y) < size + 2;
      });

      setHoveredStar(starUnderCursor || null);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", () => setHoveredStar(null));

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [stars]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ background: "black" }}
    />
  );
};
