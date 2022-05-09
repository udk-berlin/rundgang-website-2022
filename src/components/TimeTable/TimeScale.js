import React from "react";
import styled from "styled-components";
import { times, LOCATION_HEIGHT } from "./testdata";

const TimeLegend = styled.div`
  position: absolute;
  top: 0;
  left: ${({ x }) => `${x}px`};
  height: ${LOCATION_HEIGHT}px;
  box-sizing: border-box;
  border-left: 1px solid black;
`;

const TimeHour = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => theme.spacing.xs};
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
const TimeScale = ({ scaleX }) => {
  return (
    <TimeScaleWrapper>
      {times.map(t => (
        <TimeLegend key={`timeline-${t}`} x={scaleX(t)}>
          <TimeHour>{t}</TimeHour>
        </TimeLegend>
      ))}
    </TimeScaleWrapper>
  );
};

export default TimeScale;
