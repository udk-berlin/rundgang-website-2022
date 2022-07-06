import React, { useMemo } from "react";
import styled from "styled-components";
import { FormattedDateTimeRange } from "react-intl";
import { scaleLinear } from "d3-scale";
import Tag from "@/components/simple/Tag";
import LocalizedText from "modules/i18n/components/LocalizedText";
import LocationList from "../TimeTable/LocationList";
import _ from "lodash";
import { times } from "../TimeTable/constants";

const FavouriteItemWrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  display: flex;
  justify-content: flex-start;
  width: 900px;
  padding: ${({ theme }) => `${theme.space(8)} ${theme.space(16)}`};
  border-bottom: 1px solid black;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.md};
`;
const Authors = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  flex-grow: 0;
`;
const Tags = styled.div`
  display: flex;
  width: 300px;
  flex-grow: 1 1 50%;
  flex-wrap: wrap;
`;
const Info = styled.div`
  cursor: pointer;
  width: 100%;
`;
const SortNumber = styled.span`
  border: 1px solid black;
  padding: 0px 8px;
  background-color: ${({ theme }) => theme.colors.lightgrey};
  margin: ${({ theme }) => theme.space(8)};
  line-height: 0.5;
`;

const Time = styled.div`
  padding: ${({ theme }) => theme.space(6)};
  padding-left: ${({ theme }) => theme.space(8)};
  line-height: 1;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: ${({ theme }) => theme.space(16)} 0px;
  border-radius: ${({ theme }) => theme.space(48)};
  border: 2px solid ${({ theme }) => theme.colors.highlight};
  background-color: ${({ theme }) => theme.colors.maingrey};
  color: ${({ theme }) => theme.colors.highlight};
  text-align: center;
  word-wrap: break-word;
  word-break: break-all;
  width: fit-content;
  margin: ${({ theme }) => theme.space(4)};
`;

const FavouritesTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  border-bottom: 1px solid black;
  padding: ${({ theme }) => theme.space(8)};
`;

const LocationTimes = styled.div`
  width: 0px;
  height: fit-content;
  justify-content: space-between;
  display: flex;
  position: relative;
`;

const FavouriteItem = ({ element }) => {
  return (
    <FavouriteItemWrapper>
      <Tags>
        {element.template == "event" &&
          element?.allocation?.temporal?.map((t, i) => (
            <Time key={`time-range-${t.start}-${i}-${t.end}`}>
              <FormattedDateTimeRange
                from={t.start * 1000}
                weekday="short"
                hour="numeric"
                minute="numeric"
                to={t.end * 1000}
              />
            </Time>
          ))}
        {element.tags
          .filter(t =>
            ["location-room", "location-building"].includes(t.template),
          )
          .map(t => (
            <Tag
              selected={false}
              key={`${t.id}-${t.template}`}
              levelSelected={false}
              showCross={false}
              template={t.template}
            >
              {t.name}
            </Tag>
          ))}
      </Tags>
      <Info onClick={() => handleClick(element.id)}>
        <Title>
          {element?.sortIndex?.map(sor => (
            <SortNumber key={`sortnumber-${sor}-${element.id}`}>{sor}</SortNumber>
          ))}
          {element.name}
        </Title>
        <Authors>
          {[
            ...new Set(
              element.origin?.authors.map(a => (a.name ? a.name.trim() : a.id)),
            ),
          ]
            .filter(a => a)
            .join(", ")}
        </Authors>
      </Info>
    </FavouriteItemWrapper>
  );
};

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

const FavouriteLocations = ({ filteredEvents }) => {
  const scaleXSat = scaleLinear()
    .domain([1658563200, 1658631600])
    .range([20, 980])
    .clamp(true);
  const scaleXSun = scaleLinear()
    .domain([1658631600, 1658700000])
    .range([20, 980])
    .clamp(true);

  const groupedEvents = [
    [1658563200, 1658631600],
    [1658631600, 1658700000],
  ].map(day =>
    _.entries(filteredEvents).reduce(
      (obj, [house, rooms]) => ({
        ...obj,
        [house]: _.entries(rooms)
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
  );
  return (
    <div style={{ position: "relative", marginTop: "200px" }}>
      <div
        style={{
          width: "100px",
          fontSize: "60px",
          height: "fit-content",
          textAlign: "center",
          letterSpacing: "30px",
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
          letterSpacing: "30px",
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

const FavouritePrintout = ({ savedItems, filteredEvents }) => {
  const sortedItems = useMemo(
    () =>
      savedItems
        .filter(it => it.template !== "event")
        .concat(
          savedItems
            .filter(item => item.template == "event")
            .map(ev => {
              if (ev.tags.find(t => t.template == "location-building")) {
                let building = ev.tags.find(
                  t => t.template == "location-building",
                ).name;
                let room = ev.tags.find(
                  t => t.template == "location-room",
                ).name;
                return {
                  ...ev,
                  sortIndex: filteredEvents[building][room]
                    .filter(d => d.id == ev.id)
                    .map(d => d.sortIndex + 1),
                  building: building,
                  room: room,
                };
              }
            })
            .sort(
              (a, b) => Math.min(...a.sortIndex) - Math.min(...b.sortIndex),
            ),
        ),
    [filteredEvents],
  );

  return (
    <div
      id="favouriteprintout"
      style={{ width: "1000px", height: "fit-content", letterSpacing: "1.5px" }}
    >
      <div
        style={{
          width: "100px",
          fontSize: "80px",
          height: "fit-content",
          textAlign: "center",
          letterSpacing: "40px",
        }}
      >
        <LocalizedText id="saved" />
      </div>
      {_.entries(
        _.groupBy(
          sortedItems,
          d =>
            d.tags?.find(
              t =>
                t.template == "location-building" ||
                t.template == "location-external",
            )?.name,
        ),
      ).map(([loc, items]) => (
        <div key={loc}>
          <FavouritesTitle>{loc}</FavouritesTitle>
          {items.map(element => (
            <FavouriteItem
              key={`favouriteprintout-element-${element.id}`}
              element={element}
            />
          ))}
        </div>
      ))}
      <FavouriteLocations filteredEvents={filteredEvents} />
    </div>
  );
};

export default FavouritePrintout;
