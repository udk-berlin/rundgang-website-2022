import React, { useMemo } from "react";
import _ from "lodash";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { makeUrlFromId } from "@/utils/idUtils";
import { TIME_WIDTH } from "./constants";
import { useStores } from "@/stores/index";
import EventBar from "./EventBar";

const LocationWrapper = styled.div`
  height: fit-content;
  z-index: 100;
`;

const Room = styled.div`
  width: ${TIME_WIDTH}px;
  height: 100%;
  border-bottom: 1px solid black;
  position: relative;
  display: flex;
  align-items: flex-start;
  &::after {
    height: 100%;
  }
`;

const House = styled(Room)`
  min-height: 100px;
  align-items: center;
  padding-bottom: 30px;
`;

const RoomTitle = styled.div`
  white-space: nowrap;
  width: fit-content;
  background-color: white;
  padding-top: 4px;
  font-size: ${({ theme }) => theme.fontSizes.mm};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const RoomTitleWrapper = styled.div`
  width: ${({ width }) => width}px;
  z-index: 50;
  position: sticky;
  line-height: 1;
  left: 0;
  height: 100%;
`;

const RelativeWrapper = styled.div`
  position: relative;
`;
const EventsWrapper = styled.div`
  position: relative;
  display: flex;
  padding: 4px 0px;
`;

const LocationList = ({ scaleX }) => {
  const { dataStore } = useStores();
  const { pathname } = useRouter();
  const locWidth = scaleX(1658564000);
  const houseInfo = useMemo(
    () =>
      dataStore.api.locations.reduce(
        (obj, item) => ({
          ...obj,
          [item.name]: item.extra,
        }),
        {},
      ),
    [dataStore.api.locations],
  );

  console.log(houseInfo);
  return (
    <LocationWrapper>
      {dataStore?.eventLocations
        ? _.entries(dataStore.eventLocations).map(([house, rooms]) => (
            <RelativeWrapper key={`house-${house}`}>
              <House>
                <RoomTitleWrapper width={locWidth}>
                  <RoomTitle>{house}</RoomTitle>
                </RoomTitleWrapper>
                <EventsWrapper>
                  {houseInfo[house]
                    ? houseInfo[house]?.allocation?.temporal?.map(time =>
                        time.udk == "rundgang" ? (
                          <EventBar
                            key={`opening-${house}`}
                            top={0}
                            start={scaleX(time.start) - locWidth}
                            end={scaleX(time.end) - locWidth}
                          >
                            {house}
                          </EventBar>
                        ) : null,
                      )
                    : null}
                </EventsWrapper>
              </House>
              {_.entries(rooms).map(([room, events]) => (
                <Room key={`room-${room}-${house}`}>
                  <RoomTitleWrapper width={locWidth}>
                    <RoomTitle>{room}</RoomTitle>
                  </RoomTitleWrapper>
                  <EventsWrapper>
                    {_.values(_.groupBy(events, "time.start")).map(starttime =>
                      starttime.map((ev, i) => (
                        <EventBar
                          key={`ev-${room}-${ev.id}-${i}`}
                          ev={ev}
                          top={i}
                          start={scaleX(ev.time.start) - locWidth}
                          end={scaleX(ev.time.end) - locWidth}
                          link={`${pathname}/${makeUrlFromId(ev.id)}`}
                        />
                      )),
                    )}
                  </EventsWrapper>
                </Room>
              ))}
            </RelativeWrapper>
          ))
        : null}
    </LocationWrapper>
  );
};

export default observer(LocationList);
