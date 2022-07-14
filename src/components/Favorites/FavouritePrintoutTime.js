import React, { useMemo } from "react";
import styled from "styled-components";
import { entries } from "lodash";
import { scaleLinear } from "d3-scale";
import LocationList from "../TimeTable/LocationList";
import LocalizedText from "modules/i18n/components/LocalizedText";
import { times } from "../TimeTable/constants";

const LocationTimes = styled.div`
  width: 0px;
  height: fit-content;
  justify-content: space-between;
  display: flex;
  position: relative;
`;
const TimeLine = styled.div`
  height: inherit;
  border-left: 1px solid black;
  left: ${({ x }) => x}px;
  top: 0px;
  position: absolute;
`;

const TimeScaleWrapper = styled.div`
  display: flex;
  position: absolute;
  height: 100%;
`;
const TimeScaleSaved = ({ scaleX, filtertimes, day }) => {
  return (
    <TimeScaleWrapper>
      {filtertimes.map(t => (
        <TimeLine x={scaleX(t)} key={`timeline-${t}-${day}`}>
          {new Date(t * 1000).getHours()}
        </TimeLine>
      ))}
    </TimeScaleWrapper>
  );
};

const FavouritePrintoutTime = ({ filteredEvents }) => {
  const scaleXSat = scaleLinear()
    .domain([1658563200, 1658631600])
    .range([20, 980])
    .clamp(true);
  const scaleXSun = scaleLinear()
    .domain([1658631600, 1658700000])
    .range([20, 980])
    .clamp(true);

  const groupedEvents = useMemo(
    () =>
      [
        [1658563200, 1658631600],
        [1658631600, 1658700000],
      ].map(day =>
        entries(filteredEvents).reduce(
          (obj, [house, rooms]) => ({
            ...obj,
            [house]: entries(rooms)
              .map(([room, evs]) => [
                room,
                evs.filter(ev => ev.time.end >= day[0] && ev.time.end < day[1]),
              ])
              .filter(x => x[1]?.length)
              .reduce(
                (robj, [room, evs]) => ({
                  ...robj,
                  [room]: evs,
                }),
                {},
              ),
          }),
          {},
        ),
      ),
    [filteredEvents],
  );
  return (
    <div
      id="favouriteprintouttimetable"
      style={{ position: "relative", marginTop: "100px" }}
    >
      <div
        style={{
          width: "100px",
          fontSize: "60px",
          height: "fit-content",
          textAlign: "center",
          letterSpacing: "5px",
        }}
      >
        <LocalizedText id="saturday" />
      </div>
      <LocationTimes>
        <TimeScaleSaved
          scaleX={scaleXSat}
          filtertimes={times.filter(t => t <= 1658631600)}
          day="sat"
        />
        <LocationList
          scaleX={scaleXSat}
          wwidth={960}
          timeTableEvents={groupedEvents[0]}
          forSaved={true}
        />
      </LocationTimes>
      <div
        style={{
          width: "100px",
          fontSize: "60px",
          height: "fit-content",
          textAlign: "center",
          letterSpacing: "5px",
        }}
      >
        <LocalizedText id="sunday" />
      </div>
      <LocationTimes>
        <TimeScaleSaved
          scaleX={scaleXSun}
          filtertimes={times.filter(t => t > 1658631600)}
          day="sun"
        />
        <LocationList
          scaleX={scaleXSun}
          wwidth={960}
          timeTableEvents={groupedEvents[1]}
          forSaved={true}
        />
      </LocationTimes>
    </div>
  );
};

export default FavouritePrintoutTime;
