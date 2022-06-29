import React from "react";
import { scaleLinear } from "d3-scale";
import { Group, Text, Stage, Layer, Rect } from "react-konva";
import { useIntl } from "react-intl";

const START = 0;
const END = 100;
const END_TITLE = 140;
const ITEM_HEIGHT = 90;

const FavouritePrintout = ({
  savedItems,
  width,
  height,
  reference,
  pageHeight,
  numPages,
}) => {
  const intl = useIntl();
  const firstEventIndex =
    savedItems.filter(
      a => a.template == "studentproject" || a.template == "project",
    )?.length - 1;

  const scaleX = scaleLinear()
    .domain([START, END])
    .range([40, width - 40]);

  const tagName = (n, t) =>
    t.startsWith("location") ? `${intl.formatMessage({ id: t })}${n}` : n;

  return (
    <Stage width={width} height={height} ref={reference}>
      <Layer>
        <Rect width={width - 2} height={height - 2} fill="white" />
        <Group>
          {savedItems?.length > 0 ? (
            <Group>
              <Group>
                <Text
                  fill={"black"}
                  align="center"
                  x={0}
                  y={10}
                  width={width}
                  text={intl.formatMessage({ id: "saved" })}
                  fontSize={pageHeight / 7}
                  scaleY={0.5}
                />
                <Text
                  fill={"black"}
                  x={scaleX(START) - 20}
                  y={END_TITLE - 40}
                  text={intl.formatMessage({ id: "projects" })}
                  fontSize={40}
                  scaleY={0.5}
                />
                <Rect
                  x={10}
                  y={END_TITLE - 50}
                  width={width - 20}
                  height={height - END_TITLE - 40}
                  stroke="black"
                />
                {savedItems
                  .sort((a, b) =>
                    a.template == "studentproject" || a.template == "project"
                      ? -1
                      : 1,
                  )
                  .map((item, i) => {
                    return (
                      <Group key={`${item.id}-${i}-print`}>
                        {i == firstEventIndex ? (
                          <Text
                            fill={"black"}
                            x={scaleX(START) - 20}
                            y={i * ITEM_HEIGHT + END_TITLE}
                            text={intl.formatMessage({ id: "events" })}
                            fontSize={40}
                            scaleY={0.5}
                          />
                        ) : null}
                        <Group
                          x={scaleX(START)}
                          y={
                            i * ITEM_HEIGHT +
                            END_TITLE +
                            (firstEventIndex <= i ? 40 : 0) +
                            ([...Array(numPages).keys()].find(
                              p => p * 7 > i - 7,
                            ) ?? 0) *
                              100
                          }
                        >
                          <Text
                            fill={"black"}
                            fontSize={16}
                            text={item.name}
                            width={width - 60}
                            fontStyle="bold"
                          />
                          {item.allocation.temporal
                            ? item.allocation.temporal
                                .slice(0, 3)
                                .map((time, t) => (
                                  <Group
                                    key={`timesprintouttag-${time.start}`}
                                    width={155}
                                    height={21}
                                    x={(t % 3) * 165 + 3}
                                    y={
                                      20 * (item.name?.length > 40 ? 2 : 1) +
                                      Math.floor(t / 3) * 25
                                    }
                                  >
                                    <Rect
                                      stroke="black"
                                      width={155}
                                      height={21}
                                      cornerRadius={10}
                                    />
                                    <Text
                                      fill={"black"}
                                      width={155}
                                      height={21}
                                      y="5"
                                      align="center"
                                      text={intl.formatDateTimeRange(
                                        time.start * 1000,
                                        time.end * 1000,
                                        {
                                          weekday: "short",
                                          hour: "numeric",
                                          minute: "numeric",
                                        },
                                      )}
                                    />
                                  </Group>
                                ))
                            : [
                                ...new Set(
                                  item.origin?.authors
                                    .slice(0, 3)
                                    .map(a =>
                                      a.name
                                        ? a.name.split("@")[0]?.trim()
                                        : a.id,
                                    ),
                                ),
                              ].map((author, t) => (
                                <Group
                                  key={`authorsprintouttag-${author}`}
                                  width={8 * author.length + 5}
                                  height={21}
                                  x={(t % 3) * 145 + 3}
                                  y={
                                    20 * (item.name?.length > 40 ? 2 : 1) +
                                    Math.floor(t / 3) * 25
                                  }
                                >
                                  <Rect
                                    stroke="black"
                                    width={8 * author.length + 5}
                                    height={21}
                                    cornerRadius={10}
                                  />
                                  <Text
                                    fill={"black"}
                                    width={8 * author.length + 5}
                                    y="5"
                                    align="center"
                                    text={author}
                                  />
                                </Group>
                              ))}
                          <Text
                            fill={"black"}
                            width={width - 60}
                            x={0}
                            y={
                              40 +
                              (item.allocation.temporal?.length ||
                              item.origin?.authors.length
                                ? 1
                                : 0) *
                                15
                            }
                            text={item.tags
                              .map(tag => tagName(tag.name, tag.template))
                              .join(", ")}
                          />
                        </Group>
                      </Group>
                    );
                  })}
              </Group>
            </Group>
          ) : (
            "no events or projects saved yet"
          )}
        </Group>
      </Layer>
    </Stage>
  );
};

export default FavouritePrintout;
