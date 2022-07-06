import React from "react";
import styled from "styled-components";

const TimeLine = styled.div`
  height: 100%;
  border-left: 1px solid black;
  bottom: 0px;
  left: ${({ x }) => x}px;
  position: absolute;
`;

const TimeScaleWrapper = styled.div`
  display: flex;
  position: relative;
`;
const TimeScale = ({ scaleX, times }) => {
  return (
    <TimeScaleWrapper>
      {times.map(t => (
        <TimeLine x={scaleX(t)} key={`timeline-${t}`} />
      ))}
    </TimeScaleWrapper>
  );
};

export default TimeScale;
