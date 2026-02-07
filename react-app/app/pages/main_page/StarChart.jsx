import React, { useEffect, useRef, useState } from "react";

import { PageContainer } from "../../shared/components/PageContainer";
import { StarCanvas } from "./StarCanvas";
import { StarsD3 } from "./StarD3";
import stars from "../../data/stars.json";
import { Button } from "react-bootstrap";

export const StarChart = () => {
  const [layout, setLayout] = useState(0);
  return (
    <PageContainer>
      <Button onClick={() => setLayout((prev) => (prev + 1) % 2)}>
        Change Layout
      </Button>
      <div className="w-100 h-100">
        {layout === 1 ? (
          <StarCanvas stars={stars} />
        ) : (
          <StarsD3 stars={stars} />
        )}
      </div>
    </PageContainer>
  );
};
