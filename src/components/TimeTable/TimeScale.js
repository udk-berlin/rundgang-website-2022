import React from "react";
import styled from "styled-components";
import { times, LOCATION_HEIGHT } from "./testdata";

const TimeLegend = styled.div`
  position: absolute;
  top: 0;
  left: ${({ x }) => `${x}px`};
  box-sizing: border-box;

`;

const TimeLine = styled.div`
  height: ${({ height }) => `${height}px`};
  border-left: 1px solid black;
`;

const TimeHour = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  padding: ${({ theme }) => `${theme.spacing.xs} 0`};
  margin-left: -7px;
  z-index: 11;
  height: fit-content;
  width: fit-content;
  background: ${({ theme }) => theme.background.primary};
  position: sticky;
  top: 0;
`;

const TimeScaleWrapper = styled.div`
  position: relative;
  display: flex;
  top: 0px;
  left: 0px;
`;
const TimeScale = ({ scaleX, maxY }) => {
  return (
    <TimeScaleWrapper>
      {times.map(t => (
        <TimeLegend key={`timeline-${t}`} x={scaleX(t)}>
          <TimeHour>{t}</TimeHour>
          <TimeLine height={maxY} />
        </TimeLegend>
      ))}
    </TimeScaleWrapper>
  );
};

export default TimeScale;
