import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import FloorPlanSvg from "./FloorPlanSvg";
import LocalizedText from "modules/i18n/components/LocalizedText";

const FloorplanWrapper = styled.div`
  width: 100%;
  padding-bottom: ${({ theme }) => theme.spacing.md};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding-bottom: ${({ theme }) => `0 ${theme.spacing.sm}`};
  }
`;

const BackgroundImg = styled.img`
  fill: ${({ selected, theme }) =>
    selected ? theme.colors.highlight : theme.colors.lightgrey};
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
`;

const Levels = styled.div`
  margin: auto;
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  justify-content: space-around;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    justify-content: space-evenly;
  }
`;

const LevelNumber = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.md};
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
    font-size: ${({ theme }) => theme.fontSizes.sm};
    width: ${({ isAll }) => (isAll ? "fit-content" : "30px")};
    height: 30px;
  }
`;
const ImageWrapper = styled.div`
  height: 600px;
  width: 80%;
  margin: auto;
  position: relative;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    height: 500px;
    width: 600px;
  }
  @media ${({ theme }) => theme.breakpoints.mobileL} {
    height: 300px;
    width: 380px;
  }
`;

const SelectedTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const Floorplan = () => {
  const { uiStore } = useStores();

  const handleSelectRoom = useCallback(
    e => {
      if (uiStore.floorPlan) {
        if (uiStore.selectedRoom) {
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
          uiStore.setTitle(`Etage ${uiStore.floorLevel}`);
        } else {
          let data = e.target.dataset;
          let roomRect = document.querySelectorAll(`[data-id="${data.id}"]`)[0];
          if (roomRect) {
            roomRect.style.fill = "#E2FF5D";
            uiStore.setSelectedRoom(data);
            uiStore.setFloorLevel(uiStore.floorLevel);
            uiStore.setTitle(`Raum ${data.name}`);
          }
        }
      }
    },
    [uiStore.floorPlan, uiStore.selectedRoom],
  );

  const handleSelectAll = () => {
    uiStore.setSelectedRoom(null);
    uiStore.setFloorLevel(null);
    uiStore.setTitle(uiStore.currentContext?.name);
  };

  return (
    <FloorplanWrapper>
      <ImageWrapper>
        <BackgroundImg
          src={`/assets/img/${uiStore.currentContext?.name}_building.svg`}
        />
        <FloorPlanSvg
          url={uiStore.floorPlan ? uiStore.floorPlan.thumbnail_full_size : null}
          handleSelectRoom={handleSelectRoom}
        />
        <Levels>
          <LevelNumber
            key="alllevels"
            isAll
            selected={uiStore.floorLevel == null}
            onClick={() => handleSelectAll()}
          >
            <LocalizedText id="allfloors" />
          </LevelNumber>
          {uiStore.buildingLevels?.map(level => (
            <LevelNumber
              key={level.id}
              selected={level.name == uiStore.floorLevel}
              onClick={() => {
                uiStore.setTitle(`Etage ${level.name}`);
                uiStore.setFloorLevel(level.name);
              }}
            >
              {level.name}
            </LevelNumber>
          ))}
        </Levels>
      </ImageWrapper>
    </FloorplanWrapper>
  );
};

export default observer(Floorplan);
