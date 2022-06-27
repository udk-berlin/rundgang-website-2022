import React from "react";
import styled from "styled-components";
import { FormattedTime } from "react-intl";

export const times = [
  1658566800, 1658570400, 1658574000, 1658577600, 1658581200, 1658584800,
  1658588400, 1658592000, 1658595600, 1658599200, 1658602800, 1658606400,
  1658610000, 1658613600, 1658617200, 1658620800, 1658624400, 1658628000,
  1658631600, 1658635200, 1658638800, 1658642400, 1658646000, 1658649600,
  1658653200, 1658656800, 1658660400, 1658664000, 1658667600, 1658671200,
  1658674800, 1658678400, 1658682000, 1658685600, 1658689200, 1658692800,
  1658696400,
];

const TimeLine = styled.div`
  height: 100%;
  border-left: 1px solid black;
  top: 0;
  left: ${({ x }) => x}px;
  position: absolute;
`;

const TimeHour = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.mm};
  padding: ${({ theme }) => `${theme.space(4)} 0`};
  margin-left: -20px;
  z-index: 15;
  height: fit-content;
  width: fit-content;
  background: ${({ theme }) => theme.background.primary};
  position: absolute;
  left: ${({ x }) => x}px;
  top: 0;
  z-index: 400;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const TimeScaleWrapper = styled.div`
  display: flex;
  position: relative;
`;
const TimeScale = ({ scaleX }) => {
  return (
    <TimeScaleWrapper>
      {times.map(t => (
        <TimeLine x={scaleX(t)} key={`timeline-${t}`} />
      ))}
      {times.map(t => (
        <TimeHour x={scaleX(t)} key={`timehour-${t}`}>
          <FormattedTime value={t * 1000} hour="numeric" minute="numeric" />
        </TimeHour>
      ))}
    </TimeScaleWrapper>
  );
};

export default TimeScale;
