import React from "react";
import styled from "styled-components";
import { FormattedDateTimeRange } from "react-intl";
import { scaleLinear } from "d3-scale";
import Tag from "@/components/simple/Tag";
import LocalizedText from "modules/i18n/components/LocalizedText";
import LocationList from "../TimeTable/LocationList";

const FavouriteItemWrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  display: flex;
  width: 100%;
  padding: ${({ theme }) => theme.space(16)};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding: ${({ theme }) => theme.space(8)};
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.md};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;
const Authors = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  flex-grow: 0;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;
const Tags = styled.div`
  display: flex;
  width: 100%;
  flex-grow: 1 1 50%;
  padding-top: ${({ theme }) => theme.space(8)};
  flex-wrap: wrap;
`;
const Info = styled.div`
  cursor: pointer;
  width: 100%;
  padding: ${({ theme }) => ` 0px ${theme.space(8)}`};
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
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    margin: ${({ theme }) => theme.space(4)};
  }
`;

const FavouritesTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const FavouriteItem = ({ element }) => {
  return (
    <FavouriteItemWrapper>
      <Info onClick={() => handleClick(element.id)}>
        <Title>{element.name}</Title>
        <Authors>
          {[
            ...new Set(
              element.origin?.authors.map(a => (a.name ? a.name.trim() : a.id)),
            ),
          ]
            .filter(a => a)
            .join(", ")}
        </Authors>
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
      </Info>
    </FavouriteItemWrapper>
  );
};

const FavouritePrintout = ({ savedItems, houseInfo, filteredEvents }) => {
  const scaleX = scaleLinear()
    .domain([1658564000, 1658696400])
    .range([20, 980]);

  return (
    <div
      id="favouriteprintout"
      style={{ width: "500px", height: "fit-content" }}
    >
      <FavouritesTitle>
        <LocalizedText id="projects" />
      </FavouritesTitle>
      {savedItems
        .filter(
          item =>
            item.template == "studentproject" || item.template == "project",
        )
        .map(element => (
          <FavouriteItem
            key={`favouriteprintout-element-${element.id}`}
            element={element}
          />
        ))}
      <FavouritesTitle>
        <LocalizedText id="events" />
      </FavouritesTitle>
      {savedItems
        .filter(item => item.template == "event")
        .map(element => (
          <FavouriteItem
            key={`favouriteprintout-element-${element.id}`}
            element={element}
          />
        ))}

      <LocationList
        scaleX={scaleX}
        wwidth={960}
        houseInfo={houseInfo}
        timeTableEvents={filteredEvents}
      />
    </div>
  );
};

export default FavouritePrintout;
