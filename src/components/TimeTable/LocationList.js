import React from "react";
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
  z-index: 400;
`;

const Room = styled.div`
  width: ${TIME_WIDTH}px;
  height: 100%;
  border-bottom: 1px solid black;
  position: relative;
  display: flex;
  align-items: center;
  &::after {
    height: 100%;
  }
`;

const House = styled(Room)`
  min-height: 100px;
`;

const RoomTitle = styled.div`
  white-space: nowrap;
  width: fit-content;
  background-color: white;
  font-size: ${({ theme }) => theme.fontSizes.mm};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;
const RoomTitleWrapper = styled.div`
  width: ${({ width }) => width}px;
  z-index: 100;
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
  const locWidth = scaleX(1658565000);
  return (
    <LocationWrapper>
      {dataStore?.eventLocations
        ? _.entries(dataStore.eventLocations).map(([house, rooms]) => (
            <RelativeWrapper key={`house-${house}`}>
              <House>
                <RoomTitleWrapper width={locWidth}>
                  <RoomTitle>{house}</RoomTitle>
                </RoomTitleWrapper>
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
