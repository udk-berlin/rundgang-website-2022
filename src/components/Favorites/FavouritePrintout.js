import React, { useMemo } from "react";
import { entries, groupBy } from "lodash";
import styled from "styled-components";
import { FormattedDateTimeRange } from "react-intl";
import Tag from "@/components/simple/Tag";
import LocalizedText from "modules/i18n/components/LocalizedText";

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

const FavouriteItem = ({ element }) => {
  return (
    <FavouriteItemWrapper>
      <Tags>
        {element.template == "event" &&
          element?.allocation?.temporal?.map((t, i) => (
            <Time key={`time-range-${t.start}-${i}-${t.end}`}>
              <FormattedDateTimeRange
                from={(t.start - 7200) * 1000}
                weekday="short"
                hour="numeric"
                minute="numeric"
                to={(t.end - 7200) * 1000}
              />
            </Time>
          ))}
        {element.tags
          ? element.tags
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
              ))
          : null}
      </Tags>
      <Info onClick={() => handleClick(element.id)}>
        <Title>
          {element?.sortIndex?.map(sor => (
            <SortNumber key={`sortnumber-${sor}-${element.id}`}>
              {sor}
            </SortNumber>
          ))}
          {element.name}
        </Title>
        <Authors>
          {[
            ...new Set(
              element.origin?.authors.map(a =>
                a.name ? a.name.split("@")[0].trim() : null,
              ),
            ),
          ]
            .filter(a => a)
            .join(", ")}
        </Authors>
      </Info>
    </FavouriteItemWrapper>
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
              if (ev.tags?.find(t => t.template == "location-building")) {
                let building = ev.tags?.find(
                  t => t.template == "location-building",
                ).name;
                let room = ev.tags?.find(
                  t => t.template == "location-room",
                ).name;
                return {
                  ...ev,
                  sortIndex:
                    building && room && filteredEvents[building][room]
                      ? filteredEvents[building][room]
                          .filter(d => d.id == ev.id)
                          .map(d => d.sortIndex + 1)
                      : 0,
                };
              }
            })
            .sort(
              (a, b) => Math.min(...a.sortIndex) - Math.min(...b.sortIndex),
            ),
        )
        .filter(a => a && a.tags),
    [filteredEvents],
  );

  return (
    <div
      id="favouriteprintoutlist"
      style={{ width: "1000px", height: "fit-content", letterSpacing: "2px" }}
    >
      <div
        style={{
          width: "100px",
          fontSize: "80px",
          height: "fit-content",
        }}
      >
        <LocalizedText id="saved" />
      </div>
      {entries(
        groupBy(
          sortedItems,
          d =>
            d.tags?.find(
              t =>
                t.template == "location-building" ||
                t.template == "location-external",
            )?.name || "digital/elsewhere",
        ),
      ).map(([loc, items]) => (
        <div key={loc}>
          <FavouritesTitle>{loc}</FavouritesTitle>
          {items?.map(element => (
            <FavouriteItem
              key={`favouriteprintout-element-${element.id}`}
              element={element}
            />
          ))}
        </div>
      ))}
      <div
        style={{
          breakAfter: "always",
        }}
      ></div>
    </div>
  );
};

export default FavouritePrintout;
