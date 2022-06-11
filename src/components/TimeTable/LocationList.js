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
  border-bottom: 1px solid black;
  position: relative;
  align-items: end;
  display: flex;
  align-items: flex-end;
  padding: 10px 0px;
`;

const House = styled(Room)`
  height: 100px;
`;

const RoomTitle = styled.div`
  background: ${({ theme }) => theme.background.primary};
  white-space: nowrap;
  width: ${({ width }) => width}px;
  position: sticky;
  left: 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const RelativeWrapper = styled.div`
  position: relative;
`;

const LocationList = ({ scaleX }) => {
  const { dataStore } = useStores();
  const { pathname } = useRouter();
  const locWidth = scaleX(1658559600);
  return (
    <LocationWrapper>
      {dataStore?.eventLocations
        ? _.entries(dataStore.eventLocations).map(([house, rooms]) => (
            <RelativeWrapper key={`house-${house}`}>
              <House>
                <RoomTitle width={locWidth}>{house}</RoomTitle>
              </House>
              {_.entries(rooms).map(([room, events]) => (
                <Room key={`room-${room}-${house}`}>
                  <RoomTitle width={locWidth}>{room}</RoomTitle>
                  <RelativeWrapper>
                    {events?.map((ev, i) => (
                      <EventBar
                        key={`ev-${room}-${ev.id}-${i}`}
                        ev={ev}
                        start={scaleX(ev.time.start) - locWidth}
                        end={scaleX(ev.time.end) - locWidth}
                        link={`${pathname}/${makeUrlFromId(ev.id)}`}
                      />
                    ))}
                  </RelativeWrapper>
                </Room>
              ))}
            </RelativeWrapper>
          ))
        : null}
    </LocationWrapper>
  );
};

export default observer(LocationList);
