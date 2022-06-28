import React from "react";
import { scaleLinear } from "d3-scale";
import { Group, Text, Line, Stage, Layer, Rect } from "react-konva";
import { useIntl } from "react-intl";
import { times } from "../TimeTable/TimeScale";

const START_TIME = 1658553000;
const END_TIME = 1658696400;

const FavouritePrintout = ({
  savedItems,
  savedEvents,
  width,
  height,
  reference,
}) => {
  const intl = useIntl();
  const numItems = savedItems.length;
  const roomsArray = Object.values(savedEvents)
    .map(r => Object.entries(r))
    .flat();

  const numRooms = roomsArray?.length + Object.values(savedEvents).length;
  const savedItemsEnumeration = savedItems.reduce(
    (obj, it, i) => ({ ...obj, [it.id]: i + 1 }),
    {},
  );

  const scaleX = scaleLinear()
    .domain([START_TIME, END_TIME])
    .range([40, width - 40]);
  const scaleY = scaleLinear()
    .domain([0, 2 * numItems + numRooms])
    .range([40, height - 40]);

  const tagName = (n, t) =>
    t.startsWith("location") ? `${intl.formatMessage({ id: t })}${n}` : n;

  return (
    <Stage width={width} height={height} ref={reference}>
      <Layer>
        <Rect width={width} height={height} fill="white" />
        <Group>
          {savedItems?.length > 0 ? (
            <Group>
              <Group>
                <Text
                  fill={"black"}
                  x={scaleX(START_TIME)}
                  y={10}
                  text={intl.formatMessage({ id: "projectsandevents" })}
                  fontSize={30}
                />
                {savedItems.map((item, i) => (
                  <Group key={`${item.id}-${i}-print`}>
                    <Text
                      fill={"black"}
                      x={scaleX(START_TIME)}
                      y={scaleY(2 * i) + 20}
                      fontSize={16}
                      text={`${savedItemsEnumeration[item.id]}. ${item.name}`}
                    />
                    {item.allocation.temporal ? (
                      <Text
                        fill={"black"}
                        x={scaleX(START_TIME)}
                        y={scaleY(2 * i) + 40}
                        text={item.allocation.temporal
                          .map(time =>
                            intl.formatDateTimeRange(
                              time.start * 1000,
                              time.end * 1000,
                              {
                                weekday: "short",
                                hour: "numeric",
                                minute: "numeric",
                              },
                            ),
                          )
                          .join(", ")}
                      />
                    ) : (
                      <Text
                        fill={"black"}
                        x={scaleX(START_TIME)}
                        y={scaleY(2 * i) + 40}
                        text={[
                          ...new Set(
                            item.origin?.authors.map(a =>
                              a.name ? a.name.split("@")[0]?.trim() : a.id,
                            ),
                          ),
                        ].join(", ")}
                      />
                    )}
                    <Text
                      fill={"black"}
                      x={scaleX(START_TIME)}
                      y={scaleY(2 * i) + 60}
                      text={item.tags
                        .map(tag => tagName(tag.name, tag.template))
                        .join(", ")}
                    />
                  </Group>
                ))}
              </Group>

              {times.map(t => (
                <Group key={`timelineCanvas-${t}-print`}>
                  <Line
                    strokeWidth={1}
                    points={[
                      scaleX(t),
                      scaleY(2 * numItems + 1),
                      scaleX(t),
                      scaleY(2 * numItems + numRooms),
                    ]}
                    stroke="#d9d9d9"
                  />
                  <Text
                    fill={"black"}
                    x={scaleX(t)}
                    y={scaleY(2 * numItems + 1)}
                    text={intl.formatTime(t * 1000)}
                  />
                </Group>
              ))}
              <Group>
                <Text
                  fill={"black"}
                  x={scaleX(START_TIME)}
                  y={scaleY(2 * numItems)}
                  text={intl.formatMessage({ id: "timetable" })}
                  fontSize={30}
                />
                <Text
                  fill="black"
                  x={scaleX(START_TIME)}
                  y={scaleY(2 * numItems + 1)}
                  text={intl.formatMessage({ id: "saturday" })}
                />
                <Text
                  fill="black"
                  x={scaleX(1658639000)}
                  y={scaleY(2 * numItems + 1)}
                  text={intl.formatMessage({ id: "sunday" })}
                />
                {roomsArray.map(([room, events], rIndex) => (
                  <Group key={`room-${room}-print`}>
                    {rIndex == 0 ? (
                      <Group key={`house-${events[0]?.building.name}-print`}>
                        <Text
                          fill={"black"}
                          x={scaleX(START_TIME)}
                          y={scaleY(2 * numItems + 1 + rIndex) + 20}
                          text={events[0]?.building.name}
                          fontSize={20}
                        />
                        <Line
                          points={[
                            scaleX(START_TIME),
                            scaleY(2 * numItems + 2 + rIndex) + 16,
                            scaleX(END_TIME),
                            scaleY(2 * numItems + 2 + rIndex) + 16,
                          ]}
                          stroke="#d9d9d9"
                        />
                      </Group>
                    ) : null}
                    <Text
                      fill="black"
                      x={scaleX(START_TIME)}
                      y={scaleY(2 * numItems + 2 + rIndex)}
                      text={room}
                    />
                    <Line
                      points={[
                        scaleX(START_TIME),
                        scaleY(2 * numItems + 2 + rIndex) + 16,
                        scaleX(END_TIME),
                        scaleY(2 * numItems + 2 + rIndex) + 16,
                      ]}
                      stroke="#d9d9d9"
                    />
                    <Group>
                      {events.map((ev, i) => (
                        <Group key={`room-${room}-${ev.id}-${i}-print`}>
                          <Line
                            strokeWidth={scaleY(1) - scaleY(0.2)}
                            offsetY={scaleY(1) - scaleY(0.9)}
                            points={[
                              scaleX(ev.time.start),
                              scaleY(2 * numItems + 2 + rIndex),
                              scaleX(ev.time.end),
                              scaleY(2 * numItems + 2 + rIndex),
                            ]}
                            stroke="#E2FF5D"
                          />
                          <Text
                            fill="black"
                            align="center"
                            verticalAlign="middle"
                            width={scaleX(ev.time.end) - scaleX(ev.time.start)}
                            height={scaleY(1) - scaleY(0.2)}
                            offsetY={scaleY(1) - scaleY(0.6)}
                            x={scaleX(ev.time.start)}
                            y={scaleY(2 * numItems + 2 + rIndex)}
                            text={savedItemsEnumeration[ev.id]}
                          />
                        </Group>
                      ))}
                    </Group>
                  </Group>
                ))}
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
