import React from "react";
import styled from "styled-components";
import { times } from "./testdata";

const TimeLine = styled.div`
  height: 100%;
  border-left: 1px solid black;
  top: 0;
  left: ${({ x }) => x}px;
  position: absolute;
`;

const TimeHour = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  padding: ${({ theme }) => `${theme.spacing.xs} 0`};
  margin-left: -7px;
  z-index: 15;
  height: fit-content;
  width: fit-content;
  background: ${({ theme }) => theme.background.primary};
  top: 0px;
  left: ${({ x }) => x}px;
  position: absolute;
`;

const TimeScaleWrapper = styled.div`
  display: flex;
  top: 0px;
  left: 0px;
  position: sticky;
  position: -webkit-sticky;
`;
const TimeScale = ({ scaleX }) => {
  return (
    <TimeScaleWrapper>
      {times.map((t) => (
        <TimeLine x={scaleX(t)} key={`timeline-${t}`} />
      ))}
      {times.map((t) => (
        <TimeHour x={scaleX(t)} key={`timehour-${t}`}>
          {t}
        </TimeHour>
      ))}
    </TimeScaleWrapper>
  );
};

export default TimeScale;
