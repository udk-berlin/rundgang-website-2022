import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { scaleLinear, scaleOrdinal } from "d3-scale";
import LocalizedText from "modules/i18n/components/LocalizedText";
import {
  TIME_PADDING,
  LOCATION_PADDING,
  TIME_PADDING_MOBILE,
  TIME_WIDTH,
} from "./testdata";
import EventList from "./EventList";
import LocationList from "./LocationList";
import TimeScale from "./TimeScale";
import { useStores } from "@/stores/index";
import { useIsMobile } from "@/utils/useWindowSize";

const TimeTableWrapper = styled.div`
  flex-grow: 1;
  padding: ${({ theme }) => `0 ${theme.spacing.md}`};
  height: 100%;
  font-family: "Diatype";
`;

const TimeTableContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Day = styled.div`
  flex-grow: 1;
  width: 90vw;
  height: 100%;
  overflow-x: auto;
`;

const DayMenu = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding-top: ${({ theme }) => theme.spacing.xs};
`;

const DayName = styled.div`
  font-size: ${({ theme, selected }) =>
    selected ? theme.fontSizes.md : theme.fontSizes.md};
  background: ${({ theme, selected }) =>
    selected ? theme.colors.black : theme.colors.white};
  color: ${({ theme, selected }) =>
    selected ? theme.colors.white : theme.colors.black};
  border: 3px solid black;
  cursor: pointer;
`;

const TimeWrapper = styled.div`
  position: relative;
  width: ${TIME_WIDTH}px;
  height: ${({ height }) => `${height}px`};
  display: flex;
`;
/* 
into timewrapper and Day
transform: rotateX(180deg);
-ms-transform: rotateX(180deg); 
-webkit-transform: rotateX(180deg); */

const TimeTable = () => {
  const { dataStore } = useStores();
  const isMobile = useIsMobile();
  const [selectedDay, setSelectedDay] = useState(0);
  const [padding, setPadding] = useState(0);

  useEffect(() => {
    setPadding(isMobile ? TIME_PADDING_MOBILE : TIME_PADDING);
  }, [isMobile]);

  const scaleX = scaleLinear().domain([9, 24]).range([padding, TIME_WIDTH]);

  const scaleY = scaleLinear()
    .domain([0, dataStore.eventRooms?.length + 1])
    .range([LOCATION_PADDING, 50 * dataStore.eventRooms?.length + 1]);

  return (
    <TimeTableWrapper>
      <DayMenu>
        <DayName selected={selectedDay == 0} onClick={() => setSelectedDay(0)}>
          {selectedDay !== 0 && <span>&#8592;</span>}
          <LocalizedText id="saturday" />
        </DayName>
        <DayName selected={selectedDay == 1} onClick={() => setSelectedDay(1)}>
          <LocalizedText id="sunday" />
          {selectedDay !== 1 && <span>&#8594;</span>}
        </DayName>
      </DayMenu>
      <TimeTableContainer>
        <Day>
          <TimeWrapper height={scaleY(dataStore.eventRooms?.length + 2)}>
            <LocationList scaleY={index => scaleY(index)} />
            <EventList selected={selectedDay} scaleX={scaleX} scaleY={scaleY} />
            <TimeScale
              scaleX={scaleX}
              maxY={scaleY(dataStore.eventRooms?.length)}
            />
          </TimeWrapper>
        </Day>
      </TimeTableContainer>
    </TimeTableWrapper>
  );
};

export default observer(TimeTable);
