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
  opacity: ${({ grey, theme }) => (grey ? 0.8 : 1)};
  position: relative;
  top: 0px;
  left: 0;
  width: 100%;
`;

const Levels = styled.div`
  position: relative;
  top: 16px;
  left: 0;
  width: fit-content;
  max-width: inherit;
  height: fit-content;
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  border: 1px solid black;
  border-radius: ${({ theme }) => theme.space(32)};
  font-size: ${({ theme }) => theme.fontSizes.md};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    justify-content: space-evenly;
    top: 16px;
  }
`;

const SelectedRoomTitle = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.md};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const LevelNumber = styled.div`
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.md};
  border-radius: 20px;
  width: fit-content;
  height: fit-content;
  cursor: pointer;
  z-index: 100;
  padding: 8px;
  background: ${({ selected, theme }) =>
    selected ? theme.colors.lightgrey : theme.colors.white};
  &:hover {
    background: ${({ theme }) => theme.colors.lightgrey};
  }
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;
const ImageWrapper = styled.div`
  width: 90%;
  height: auto;
  margin: auto;
  position: relative;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    width: 90%;
  }
  ${({ visibleRooms, theme }) =>
    visibleRooms.map(
      r => `[data-name="${r}"] { fill: ${theme.colors.lightgrey}; &:hover {
        fill: ${theme.colors.highlight};
      }}`,
    )}
`;

const Floorplan = () => {
  const { uiStore, dataStore } = useStores();
  const [visibleRooms, setVisibleRooms] = useState([]);

  useEffect(() => {
    if (dataStore.api.existingRooms && uiStore.floorPlan) {
      setVisibleRooms(
        uiStore.floorPlan.context
          .filter(r => r.id in dataStore.api.existingRooms)
          .map(r => r.name),
      );
    }
  }, [uiStore.floorPlan, dataStore.api.existingRooms]);

  useEffect(() => {
    if (
      uiStore.currentContext?.context?.find(
        level => level.name == "0" && level.context?.length,
      )
    ) {
      uiStore.setFloorLevel(0);
    }
  }, [uiStore.currentContext?.context]);

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
    [uiStore.floorPlan, uiStore.selectedRoom, uiStore.floorLevel],
  );

  const handleSelectAll = () => {
    uiStore.setSelectedRoom(null);
    uiStore.setFloorLevel(null);
  };

  return (
    <FloorplanWrapper>
      <Levels>
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
                <LocalizedText id={`level${level.name}`} />
              </LevelNumber>
            ),
        )}
      </Levels>
      <ImageWrapper visibleRooms={visibleRooms}>
        <BackgroundImg
          grey={uiStore.floorLevel == null}
          src={`/assets/img/${uiStore.currentContext?.description.default}_building.svg`}
        />
        <FloorPlanSvg
          url={uiStore.floorPlan ? uiStore.floorPlan.thumbnail_full_size : null}
          handleSelectRoom={handleSelectRoom}
        />
      </ImageWrapper>
      <SelectedRoomTitle>
        {uiStore.selectedRoom
          ? `${uiStore.selectedRoom?.topic} ${uiStore.selectedRoom?.name}`
          : null}
      </SelectedRoomTitle>
    </FloorplanWrapper>
  );
};

export default observer(Floorplan);
