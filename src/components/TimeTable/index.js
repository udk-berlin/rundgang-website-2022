import React, { useEffect, useState, useCallback } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { scaleLinear } from "d3-scale";
import LocalizedText from "modules/i18n/components/LocalizedText";
import LocationList from "./LocationList";
import TimeScale, { times } from "./TimeScale";
import useMediaQuery from "@/utils/useMediaQuery";
import {
  TIME_PADDING,
  TIME_PADDING_MOBILE,
  TIME_WIDTH,
  TIME_WIDTH_MOBILE,
} from "./constants";
import {
  SEARCHBAR_HEIGHT,
  TITLE_HEIGHT,
  SEARCHBAR_PADDING,
  MIN_PADDING,
} from "@/utils/constants";
import useTopScrollBar from "@/utils/useTopScrollBar";
import { FormattedDate } from "react-intl";

const TimeTableWrapper = styled.div`
  padding: ${({ theme }) => `0 ${theme.space(16)}`};
  margin-bottom: 40px;
  height: fit-content;
  min-height: calc(100vh - 160px);
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  *::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  *::-webkit-scrollbar-track {
    outline: none;
  }
  *::-webkit-scrollbar-thumb {
    outline: none;
  }
`;

const TimeTableContainer = styled.div`
  width: 100%;
  height: fit-content;
  overflow-x: auto;
  overflow-y: visible;
  justify-content: space-between;
  position: relative;
  display: flex;
`;

const DayMenu = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const DayName = styled.div`
  position: fixed;
  padding-left: ${({ theme }) => theme.space(8)};
  left: ${({ left }) => (left ? "8px" : "auto")};
  right: ${({ left }) => (left ? "auto" : "8px")};
  font-size: ${({ theme, selected }) =>
    selected ? theme.fontSizes.xl : theme.fontSizes.lm};
  cursor: pointer;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme, selected }) =>
      selected ? theme.fontSizes.lg : theme.fontSizes.md};
  }
`;

const Arrow = styled.span`
  font-family: "Inter";
`;

const TimeHeader = styled.div`
  position: fixed;
  background-color: white;
  display: inline;
  width: 100%;
  height: 100px;
  overflow-x: auto;
  overflow-y: visible;
  z-index: 300;
  top: ${SEARCHBAR_HEIGHT + TITLE_HEIGHT + SEARCHBAR_PADDING}px;
`;

const TimeHour = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.mm};
  height: 0;
  width: 0;
  background: ${({ theme }) => theme.background.primary};
  position: absolute;
  left: ${({ x }) => x - 8}px;
  top: 60px;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;
const TimeNumbers = styled.div`
  position: absolute;
  width: ${({ wwidth }) => wwidth}px;
`;

const DateWrapper = styled.span`
  margin: ${({ theme }) => theme.space(16)};
  display: inline;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    display: none;
  }
`;

const TimeTable = () => {
  const isMobile = useMediaQuery(
    "only screen and (max-width:768px) and (orientation:portrait)",
  );
  const [selectedDay, setSelectedDay] = useState(0);
  const [padding, setPadding] = useState(0);
  const [width, setWidth] = useState(0);
  const scrollPos = useTopScrollBar(
    "time-table-container",
    "top-table-scroller",
  );

  useEffect(() => {
    setPadding(isMobile ? TIME_PADDING_MOBILE : TIME_PADDING);
    setWidth(isMobile ? TIME_WIDTH_MOBILE : TIME_WIDTH);
  }, [isMobile]);

  const scaleX = scaleLinear()
    .domain([1658564000, 1658696400])
    .range([padding, width]);

  const isSunday = scaleX(1658613600) < scrollPos;

  const switchDay = useCallback(
    day => {
      if (day == 1) {
        setSelectedDay(1);
        document.getElementById("time-table-container").scrollLeft =
          scaleX(1658633600);
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
      <TimeHeader id="top-table-scroller">
        <DayMenu>
          <DayName
            selected={selectedDay == 0}
            left
            onClick={() => switchDay(0)}
          >
            {selectedDay !== 0 && <Arrow>&#8592;</Arrow>}
            <LocalizedText id="saturday" />
          </DayName>
          <DayName selected={selectedDay == 1} onClick={() => switchDay(1)}>
            <LocalizedText id="sunday" />
            {selectedDay !== 1 && <Arrow>&#8594;</Arrow>}
          </DayName>
        </DayMenu>
        <TimeNumbers wwidth={width}>
          {times.map(t => (
            <TimeHour x={scaleX(t)} key={`timehour-${t}`}>
              {new Date(t * 1000).getHours()}
            </TimeHour>
          ))}
        </TimeNumbers>
      </TimeHeader>
      <TimeTableContainer id={"time-table-container"}>
        <TimeScale scaleX={scaleX} />
        <LocationList scaleX={scaleX} width={width} />
      </TimeTableContainer>
    </TimeTableWrapper>
  );
};

export default observer(TimeTable);
