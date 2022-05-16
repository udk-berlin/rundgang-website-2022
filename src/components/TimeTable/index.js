import React, { useState } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { scaleLinear } from "d3-scale";
import LocalizedText from "modules/i18n/components/LocalizedText";
import {
  times,
  TIME_PADDING,
  LOCATION_PADDING,
  LOCATION_HEIGHT,
  TIME_WIDTH,
} from "./testdata";
import EventList from "./EventList";
import LocationList from "./LocationList";
import TimeScale from "./TimeScale";

const TimeTableWrapper = styled.div`
  flex-grow: 1;
  padding: ${({ theme }) => `0 ${theme.spacing.md}`};
  height: 100%;
`;

const DayMenu = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const Day = styled.div`
  flex-grow: 1;
  width: 90vw;
  height: 100%;
  overflow-x: auto;
  transform: rotateX(180deg);
  -ms-transform: rotateX(180deg); /* IE 9 */
  -webkit-transform: rotateX(180deg); /* Safari and Chrome */
`;
const DayName = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const TimeWrapper = styled.div`
  position: relative;
  width: ${TIME_WIDTH}px;
  height: ${LOCATION_HEIGHT}px;
  display: flex;
  transform: rotateX(180deg);
  -ms-transform: rotateX(180deg); /* IE 9 */
  -webkit-transform: rotateX(180deg); /* Safari and Chrome */
`;

const TimeTable = () => {
  const [selectedDay, setSelectedDay] = useState(0);

  const scaleX = scaleLinear()
    .domain([10, 24])
    .range([TIME_PADDING, TIME_WIDTH]);

  const scaleY = scaleLinear()
    .domain([0, 20])
    .range([LOCATION_PADDING, LOCATION_HEIGHT]);
  return (
    <TimeTableWrapper>
      <DayMenu>
        <Day>
          <TimeWrapper>
            <DayName>
              <LocalizedText id="saturday" />
            </DayName>
            <LocationList scaleY={scaleY} />
            <EventList scaleX={scaleX} scaleY={scaleY} />
            <TimeScale scaleX={scaleX} />
          </TimeWrapper>
        </Day>
      </DayMenu>
    </TimeTableWrapper>
  );
};

export default observer(TimeTable);
