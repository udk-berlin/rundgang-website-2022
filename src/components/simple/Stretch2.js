import React, { useRef } from "react";
import styled from "styled-components";
import useFitText from "@/utils/useFitText";
import useWindowSize from "@/utils/useWindowSize";

const StretchLayout = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  visibility: hidden;
  overflow: hidden;
  pointer-events: none;
  font-size: ${({ fontSize }) => fontSize}px;
`;
const RealText = styled.div`
  display: flex;
  width: 100%;
  height: ${({ height }) => height}px;
  transform: ${({ scaling }) => `scaleY(${scaling})`};
  line-height: ${({ lineh }) => lineh};
  position: relative;
  white-space: nowrap;
  font-size: ${({ fontSize }) => fontSize}px;
`;

const Stretch = ({ children, arrowDir, height }) => {
  const size = useWindowSize();
  const { fontSize, ref } = useFitText();
  const otherRef = useRef();
  console.log(
    fontSize,
    height,
    ref?.current?.clientHeight,
    height / ref?.current?.clientHeight,
  );
  return (
    <>
      <RealText
        ref={otherRef}
        fontSize={fontSize}
        height={Math.min(height, ref?.current?.clientHeight)}
        scaling={Math.min(1, height / ref?.current?.clientHeight)}
        lineh={Math.min(1, height / ref?.current?.clientHeight)}
      >
        {arrowDir && (arrowDir == "left" || arrowDir == "top") ? (
          arrowDir == "left" ? (
            <>&#8592;</>
          ) : (
            <>&#8593;</>
          )
        ) : null}
        {children}
        {arrowDir && (arrowDir == "right" || arrowDir == "bottom") ? (
          arrowDir == "right" ? (
            <>&#8594;</>
          ) : (
            <>&#8595;</>
          )
        ) : null}
      </RealText>
      <StretchLayout ref={ref} fontSize={fontSize} maxh={size.height ?? 0}>
        {arrowDir && (arrowDir == "left" || arrowDir == "top") ? (
          arrowDir == "left" ? (
            <>&#8592;</>
          ) : (
            <>&#8593;</>
          )
        ) : null}
        {children}
        {arrowDir && (arrowDir == "right" || arrowDir == "bottom") ? (
          arrowDir == "right" ? (
            <>&#8594;</>
          ) : (
            <>&#8595;</>
          )
        ) : null}
      </StretchLayout>
    </>
  );
};

export default Stretch;
