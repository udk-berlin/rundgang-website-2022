import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import useMousePosition from "@/utils/useMousePosition";
import useWindowSize from "@/utils/useWindowSize";

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 8000;
  pointer-events: none;
`;

const segNum = 80;
const INIT_ARR = [...Array(segNum)].map((_, i) => ({ x: 0, y: 0 }));

const CursorLine = () => {
  const canvasRef = useRef(null);
  const size = useWindowSize();
  const [arr, setArr] = useState(INIT_ARR);
  const mousePos = useMousePosition();

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas && size.width) {
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.lineWidth = 5;
      context.moveTo(arr[0].x, arr[0].y);
      arr.map(c => {
        context.lineTo(c.x, c.y);
      });
      context.strokeStyle = "#E2FF5D";
      context.stroke();
      context.closePath();
    }
  }, [arr, size.width]);

  useEffect(() => {
    setArr(arr => {
      arr.shift();
      arr.push(mousePos);
      return arr;
    });
    draw();
  }, [mousePos]);

  return size.width && size.height ? (
    <Canvas width={size.width} height={size.height} ref={canvasRef} />
  ) : null;
};

export default CursorLine;
