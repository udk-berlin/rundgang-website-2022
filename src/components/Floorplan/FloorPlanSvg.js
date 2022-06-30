import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { createRoot } from "react-dom/client";
import { ReactSVG } from "react-svg";

const Floorplan = styled.div`
  position: absolute;
  top: 0px;
  left: 0;
  z-index: 10;
  width: 100%;
  rect {
    cursor: pointer;
    stroke: ${({ theme }) => theme.colors.black};
    stroke-width: 10px;
  }
`;

const FloorPlanSvg = ({ url, handleSelectRoom }) => {
  const [svgRoot, setSvgRoot] = useState();
  const svgRef = useRef();

  useEffect(() => {
    if (svgRef?.current && !svgRoot) {
      setSvgRoot(svgRef?.current ? createRoot(svgRef?.current) : null);
    }
  }, [svgRef]);

  useEffect(() => {
    if (url && svgRoot) {
      svgRoot.render(<ReactSVG src={url} />);
    } else if (svgRoot) {
      svgRoot.render();
    }
  }, [url]);

  return (
    <Floorplan onClick={e => handleSelectRoom(e)} ref={svgRef}></Floorplan>
  );
};

export default FloorPlanSvg;
