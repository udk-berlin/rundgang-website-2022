import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { TIME_WIDTH, TIME_PADDING } from "./testdata";
import { useStores } from "@/stores/index";

const LocationWrapper = styled.div`
  position: sticky;
  display: flex;
  top: 0px;
  left: 0px;
  z-index: 400;
`;

const Room = styled.div`
  position: absolute;
  width: ${TIME_WIDTH}px;
  top: ${({ y0 }) => `${y0}px`};
  height: ${({ y0, y1 }) => `${y1 - y0 - 3}px`};
  border-bottom: 1px solid black;
  left: 0px;
`;

const House = styled(Room)``;

const RoomTitle = styled.div`
  background: ${({ theme }) => theme.background.primary};
  white-space: nowrap;
  width: fit-content;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${({ theme }) => theme.fontSizes.md};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

const HouseTitle = styled(RoomTitle)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 0.9;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const LocationList = ({ scaleY }) => {
  const { dataStore } = useStores();
  return (
    <LocationWrapper>
      {dataStore?.eventRooms && dataStore.eventRooms?.length
        ? dataStore.eventRooms.map(room =>
            room.children?.length ? (
              <House y0={scaleY(room.index)} y1={scaleY(room.index + 1)}>
                <HouseTitle>{room.name}</HouseTitle>
              </House>
            ) : (
              <Room y0={scaleY(room.index)} y1={scaleY(room.index + 1)}>
                <RoomTitle>{room.name}</RoomTitle>
              </Room>
            ),
          )
        : null}
    </LocationWrapper>
  );
};

export default observer(LocationList);
