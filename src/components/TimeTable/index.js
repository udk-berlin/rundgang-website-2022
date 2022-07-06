import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { scaleLinear } from "d3-scale";
import LocalizedText from "modules/i18n/components/LocalizedText";
import TimeScale from "./TimeScale";
import useMediaQuery from "@/utils/useMediaQuery";
import {
  TIME_PADDING,
  TIME_PADDING_MOBILE,
  TIME_WIDTH,
  TIME_WIDTH_MOBILE,
  times,
} from "./constants";
import {
  SEARCHBAR_HEIGHT,
  TITLE_HEIGHT,
  SEARCHBAR_PADDING,
} from "@/utils/constants";
import useTopScrollBar from "@/utils/useTopScrollBar";
import { useStores } from "@/stores/index";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const LocationList = dynamic(() => import("./LocationList"), {
  suspense: true,
});

const TimeTableWrapper = styled.div`
  display: grid;
  gap: 16px 16px;
  grid-template-columns: 1fr;
  margin-bottom: 30px;
  height: fit-content;
  min-height: calc(100vh - 200px);
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: black #d9d9d9;
  &::selection {
    background: black;
    color: #e2ff5d;
  }
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: #d9d9d9;
    outline: 1px solid #d9d9d9;
  }
  &::-webkit-scrollbar-thumb {
    background-color: black;
    outline: 1px solid black;
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
  justify-content: flex-start;
  width: 100%;
  margin-top: 16px;
  position: fixed;
  left: 16px;
`;

const DayName = styled.div`
  cursor: pointer;
  border: 1px solid black;
  margin-right: ${({ theme }) => theme.space(8)};
  background: ${({ theme, selected }) =>
    selected ? theme.colors.maingrey : theme.colors.white};
  color: ${({ theme, selected }) =>
    selected ? theme.colors.highlight : theme.colors.black};
  border-color: ${({ theme, selected }) =>
    selected ? theme.colors.highlight : theme.colors.black};
  padding: ${({ theme }) => `${theme.space(4)} ${theme.space(16)}`};
  font-size: ${({ theme }) => theme.fontSizes.lm};
  border-radius: ${({ theme }) => theme.space(48)};
  width: fit-content;
  word-wrap: break-word;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.mm};
  }
`;

const Arrow = styled.span`
  font-family: "Inter";
`;

const TimeHeader = styled.div`
  position: fixed;
  background-color: white;
  display: inline;
  width: calc(100% - 32px);
  height: 120px;
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
  top: 80px;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;
const TimeNumbers = styled.div`
  position: absolute;
  width: ${({ wwidth }) => wwidth}px;
`;

const TimeTable = () => {
  const { uiStore } = useStores();
  const [padding, setPadding] = useState(0);
  const [width, setWidth] = useState(0);

  const isMobile = useMediaQuery(
    "only screen and (max-width:768px) and (orientation:portrait)",
  );
  useEffect(() => {
    setPadding(isMobile ? TIME_PADDING_MOBILE : TIME_PADDING);
    setWidth(isMobile ? TIME_WIDTH_MOBILE : TIME_WIDTH);
  }, [isMobile]);

  const scaleX = scaleLinear()
    .domain([1658564000, 1658696400])
    .range([padding, width]);

  const { switchDay, selectedDay, bottomScroll, topScroll } = useTopScrollBar(
    scaleX(1658613600),
    scaleX(1658649600),
  );

  return (
    <TimeTableWrapper>
      <TimeHeader id="top-table-scroller" ref={topScroll}>
        <DayMenu>
          <DayName
            selected={selectedDay == 0}
            left
            onClick={() => switchDay(0)}
          >
            {selectedDay == 1 && <Arrow>&#8592;</Arrow>}
            <LocalizedText id="saturday" />
          </DayName>
          <DayName selected={selectedDay == 1} onClick={() => switchDay(1)}>
            <LocalizedText id="sunday" />
            {selectedDay == 0 && <Arrow>&#8594;</Arrow>}
          </DayName>
        </DayMenu>
        <TimeNumbers wwidth={width}>
          {times.map(t => (
            <TimeHour x={scaleX(t)} key={`timehour-${t}`} id={`timehour-${t}`}>
              {new Date(t * 1000).getHours()}
            </TimeHour>
          ))}
        </TimeNumbers>
      </TimeHeader>
      <TimeTableContainer id={"time-table-container"} ref={bottomScroll}>
        <TimeScale scaleX={scaleX} times={times} />
        <Suspense fallback="loading...">
          <LocationList
            scaleX={scaleX}
            wwidth={width}
            houseInfo={uiStore.houseInfo}
            timeTableEvents={uiStore.filteredEvents}
          />
        </Suspense>
      </TimeTableContainer>
    </TimeTableWrapper>
  );
};

export default observer(TimeTable);
