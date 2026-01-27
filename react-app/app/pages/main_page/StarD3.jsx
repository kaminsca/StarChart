import React, { useState } from "react";
import { geoStereographic, geoPath } from "d3-geo";

import { getSpectralClass } from "../../shared/utils/SpectralClass";

export const StarsD3 = ({ stars, width = 1000, height = 1000 }) => {
  const [hoveredStar, setHoveredStar] = useState(null);

  // Projection: stereographic for a circular sky map
  const projection = geoStereographic()
    .scale(width / 4)
    .translate([width / 2, height / 2]);

  // Convert RA/Dec to [lon, lat]
  const projectedStars = stars.map((star) => {
    const lon = -star.ra; // RA increases to the left
    const lat = star.dec;
    const [x, y] = projection([lon, lat]) || [0, 0];
    const size = Math.max(0, 5 - (star.mag / 6) * 7);
    return { ...star, x, y, size };
  });

  return (
    <svg width={width} height={height} style={{ background: "black" }}>
      {projectedStars.map((star, i) => (
        <circle
          key={i}
          cx={star.x}
          cy={star.y}
          r={star.size}
          fill={getSpectralClass(star.spectral)}
          onMouseEnter={() => setHoveredStar(star)}
          onMouseLeave={() => setHoveredStar(null)}
        />
      ))}

      {hoveredStar && (
        <text
          x={hoveredStar.x + 10}
          y={hoveredStar.y - 10}
          fill="white"
          fontSize={24}
        >
          {hoveredStar.name || "Unnamed"}
          {"\n"}
          {hoveredStar.spectral}
        </text>
      )}
    </svg>
  );
};
