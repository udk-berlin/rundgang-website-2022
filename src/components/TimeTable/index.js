import React, { useEffect, useState, useCallback } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { scaleLinear, scaleOrdinal } from "d3-scale";
import LocalizedText from "modules/i18n/components/LocalizedText";
import LocationList from "./LocationList";
import TimeScale from "./TimeScale";
import { useStores } from "@/stores/index";
import { useIsMobile } from "@/utils/useWindowSize";
import {
  TIME_PADDING,
  TIME_PADDING_MOBILE,
  TIME_WIDTH,
  TIME_WIDTH_MOBILE,
} from "./constants";
import { useIsScrolledX } from "@/utils/useIsScrolled";

const TimeTableWrapper = styled.div`
  padding: ${({ theme }) => `0 ${theme.spacing.md}`};
  height: fit-content;
  font-family: "Diatype";
  margin-bottom: ${({ theme }) => theme.spacing.lg};
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
  transform: rotateX(180deg);
  -ms-transform: rotateX(180deg);
  -webkit-transform: rotateX(180deg);
`;

const DayMenu = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: ${({ theme }) => theme.spacing.xs};
`;

const DayName = styled.div`
  font-size: ${({ theme, selected }) =>
    selected ? theme.fontSizes.xl : theme.fontSizes.lm};
  cursor: pointer;
`;

const TimeWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  transform: rotateX(180deg);
  -ms-transform: rotateX(180deg);
  -webkit-transform: rotateX(180deg);
`;

const TimeTable = () => {
  const { dataStore } = useStores();
  const isMobile = useIsMobile();
  const [selectedDay, setSelectedDay] = useState(0);
  const [padding, setPadding] = useState(0);

  useEffect(() => {
    setPadding(isMobile ? TIME_PADDING_MOBILE : TIME_PADDING);
  }, [isMobile]);

  const scaleX = scaleLinear()
    .domain([1658563200, 1658696400])
    .range([padding, isMobile ? TIME_WIDTH_MOBILE : TIME_WIDTH]);

  const isSunday = useIsScrolledX(scaleX(1658613600), "time-table-container");

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
          {selectedDay !== 0 && <span>&#8592;</span>}
          <LocalizedText id="saturday" />
        </DayName>
        <DayName selected={selectedDay == 1} onClick={() => switchDay(1)}>
          <LocalizedText id="sunday" />
          {selectedDay !== 1 && <span>&#8594;</span>}
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
