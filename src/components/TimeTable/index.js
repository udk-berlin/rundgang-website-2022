import React, { useEffect, useState, useCallback } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { scaleLinear, scaleOrdinal } from "d3-scale";
import LocalizedText from "modules/i18n/components/LocalizedText";
import LocationList from "./LocationList";
import TimeScale, { times } from "./TimeScale";
import { useIsMobile } from "@/utils/useWindowSize";
import {
  TIME_PADDING,
  TIME_PADDING_MOBILE,
  TIME_WIDTH,
  TIME_WIDTH_MOBILE,
} from "./constants";
import { useIsScrolledX } from "@/utils/useIsScrolled";

const TimeTableWrapper = styled.div`
  padding: ${({ theme }) => `0 ${theme.space(16)}`};
  height: fit-content;
  margin-bottom: ${({ theme }) => theme.space(48)};
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
`;

const TimeTableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  flex-grow: 1;
  justify-content: space-between;
`;

const DayMenu = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: white;
  position: sticky;
  top: 18vh;
  z-index: 300;
`;

const DayName = styled.div`
  font-size: ${({ theme, selected }) =>
    selected ? theme.fontSizes.xl : theme.fontSizes.lm};
  cursor: pointer;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme, selected }) =>
      selected ? theme.fontSizes.lg : theme.fontSizes.md};
  }
`;

const TimeWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
`;

const Arrow = styled.span`
  font-family: "Inter";
`;

const TimeTable = () => {
  const isMobile = useIsMobile();
  const [selectedDay, setSelectedDay] = useState(0);
  const [padding, setPadding] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setPadding(isMobile ? TIME_PADDING_MOBILE : TIME_PADDING);
    setWidth(isMobile ? TIME_WIDTH_MOBILE : TIME_WIDTH);
  }, [isMobile]);

  const scaleX = scaleLinear()
    .domain([1658564000, 1658696400])
    .range([padding, width]);

  const isSunday = useIsScrolledX(scaleX(1658638800), "time-table-container");

  const switchDay = useCallback(
    day => {
      if (day == 1) {
        setSelectedDay(1);
        document.getElementById("time-table-container").scrollLeft =
          scaleX(1658638800);
      } else {
        setSelectedDay(0);
        document.getElementById("time-table-container").scrollLeft = 0;
      }
    },
    [selectedDay],
  );

  useEffect(() => {
    if (isSunday) {
      setSelectedDay(1);
    } else {
      setSelectedDay(0);
    }
  }, [isSunday]);
  return (
    <TimeTableWrapper>
      <DayMenu>
        <DayName selected={selectedDay == 0} onClick={() => switchDay(0)}>
          {selectedDay !== 0 && <Arrow>&#8592;</Arrow>}
          <LocalizedText id="saturday" />
        </DayName>
        <DayName selected={selectedDay == 1} onClick={() => switchDay(1)}>
          <LocalizedText id="sunday" />
          {selectedDay !== 1 && <Arrow>&#8594;</Arrow>}
        </DayName>
      </DayMenu>
      <TimeTableContainer id="time-table-container">
        <TimeWrapper>
          <TimeScale scaleX={scaleX} />
          <LocationList scaleX={scaleX} />
        </TimeWrapper>
      </TimeTableContainer>
    </TimeTableWrapper>
  );
};

export default observer(TimeTable);
