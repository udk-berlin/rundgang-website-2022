import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import FloorPlanSvg from "./FloorPlanSvg";
import LocalizedText from "modules/i18n/components/LocalizedText";

const FloorplanWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: ${({ theme }) => theme.space(16)};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding-bottom: ${({ theme }) => theme.space(8)};
  }
`;

const BackgroundImg = styled.img`
  fill: ${({ selected, theme }) =>
    selected ? theme.colors.highlight : theme.colors.lightgrey};
  position: relative;
  top: 0px;
  left: 0;
  width: 100%;
`;

const Levels = styled.div`
  position: relative;
  margin: auto;
  top: -32px;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.md};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    justify-content: space-evenly;
  }
`;

const SelectedRoomTitle = styled.div`
  width: 100%;
  text-align: center;
  min-height: 20px;
`;

const LevelNumber = styled.button`
  border: none;
  border-radius: ${({ isAll }) => (isAll ? "20px" : "50%")};
  width: ${({ isAll }) => (isAll ? "fit-content" : "40px")};
  height: 40px;
  cursor: pointer;
  z-index: 100;
  background: ${({ selected, theme }) =>
    selected ? theme.colors.lightgrey : theme.colors.white};
  &:hover {
    background: ${({ theme }) => theme.colors.lightgrey};
  }
  @media ${({ theme }) => theme.breakpoints.tablet} {
    width: ${({ isAll }) => (isAll ? "fit-content" : "30px")};
    height: 30px;
  }
`;
const ImageWrapper = styled.div`
  width: 80%;
  height: auto;
  margin: auto;
  position: relative;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    width: 90%;
  }
  ${({ visibleRooms, theme }) =>
    visibleRooms.map(
      r => `[data-name="${r}"] { fill: ${theme.colors.lightgrey};}`,
    )}
`;

const Floorplan = () => {
  const { uiStore, dataStore } = useStores();
  const [visibleRooms, setVisibleRooms] = useState([]);
  console.log(visibleRooms);

  useEffect(() => {
    if (dataStore.api.existingRooms && uiStore.floorPlan) {
      setVisibleRooms(
        uiStore.floorPlan.context
          .filter(r => r.id in dataStore.api.existingRooms)
          .map(r => r.name),
      );
    }
  }, [uiStore.floorPlan, dataStore.api.existingRooms]);

  const handleSelectRoom = useCallback(
    e => {
      if (uiStore.floorPlan) {
        if (uiStore.selectedRoom?.id) {
          let oldRoomRect = document.querySelectorAll(
            `[data-id="${uiStore.selectedRoom.id}"]`,
          )[0];
          if (oldRoomRect) {
            oldRoomRect.style.fill = "#d9d9d9";
          }
        }
        if (!e.target?.dataset?.id) {
          uiStore.setSelectedRoom(null);
          uiStore.setFloorLevel(uiStore.floorLevel);
        } else {
          let data = e.target.dataset;
          let dataid =
            process.env.NODE_ENV == "development" ? "dev" : "production";
          if (data[dataid] in dataStore.api.existingRooms) {
            let roomRect = document.querySelectorAll(
              `[data-id="${data.id}"]`,
            )[0];
            if (roomRect) {
              roomRect.style.fill = "#E2FF5D";
              uiStore.setSelectedRoom(data);
              uiStore.setFloorLevel(uiStore.floorLevel);
            }
          } else {
            uiStore.setSelectedRoom(null);
          }
        }
      }
    },
    [uiStore.floorPlan, uiStore.selectedRoom],
  );

  const handleSelectAll = () => {
    uiStore.setSelectedRoom(null);
    uiStore.setFloorLevel(null);
  };

  return (
    <FloorplanWrapper>
      <ImageWrapper visibleRooms={visibleRooms}>
        <BackgroundImg
          src={`/assets/img/${uiStore.currentContext?.description.default}_building.svg`}
        />
        <FloorPlanSvg
          url={uiStore.floorPlan ? uiStore.floorPlan.thumbnail_full_size : null}
          handleSelectRoom={handleSelectRoom}
        />
      </ImageWrapper>
      <Levels>
        <SelectedRoomTitle>
          {uiStore.selectedRoom?.topic ?? <LocalizedText id="allfloors" />}{" "}
          {uiStore.selectedRoom?.name}
        </SelectedRoomTitle>
        <LevelNumber
          key="alllevels"
          isAll
          selected={uiStore.floorLevel == null}
          onClick={() => handleSelectAll()}
        >
          <LocalizedText id="allfloors" />
        </LevelNumber>
        {uiStore.buildingLevels?.map(
          level =>
            level.id in dataStore.api.existingRooms && (
              <LevelNumber
                key={level.id}
                selected={level.name == uiStore.floorLevel}
                onClick={() => {
                  uiStore.setFloorLevel(level.name);
                }}
              >
                {level.name}
              </LevelNumber>
            ),
        )}
      </Levels>
    </FloorplanWrapper>
  );
};

export default observer(Floorplan);
