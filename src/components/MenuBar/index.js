import React, { useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import Arrow from "../Arrow";

const MenuBarWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  font-family: "Diatype";
`;

const BackArrow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
`;

const Container = styled.div`
  width: 100%;
  height: 10vw;
  left: 0;
  top: 0;
  z-index: 10;
  background-color: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.colors.primary};
  overflow-x: hidden;
  overflow: hidden;
`;

const Title = styled.div`
  overflow: hidden;
  font-size: 9vw;
  transition: transform 1s, width 1s;
  transition-timing-function: linear;
  pointer-events: none;
  width: 80%;
  display: flex;
  align-items: center;
  position: fixed;
  left: ${({ position }) => (position == "left" ? 0 : "auto")};
  right: ${({ position }) => (position == "right" ? 0 : "auto")};
  text-align: ${({ position }) => (position == "right" ? "right" : "left")};
  justify-content: ${({ position }) =>
    position == "right" ? "flex-end" : "flex-start"};
  transform-origin: ${({ position }) =>
    position == "right" ? "top right" : "top left"};
  transform: ${({ scaling }) => scaling};
`;

const Header = styled.div`
  display: flex;
  width: 100%;
`;

const MenuBar = () => {
  const { uiStore } = useStores();

  const scaleFullWidth = index =>
    uiStore.selected == index
      ? `scaleX(${
          uiStore.scaleFactor / Math.sqrt(uiStore.menuItems[index].length)
        }) `
      : "scaleX(0)";

  const computeDirection = index => {
    if (uiStore.direction == "left" && index == uiStore.previous) {
      return "right";
    }
    if (uiStore.direction == "right" && index == uiStore.previous) {
      return "left";
    }
    if (uiStore.direction == "left" && index == uiStore.selected) {
      return "left";
    }
    if (uiStore.direction == "right" && index == uiStore.selected) {
      return "right";
    }
  };

  const handleSwipeLeft = () => {
    uiStore.setMenuState("left");
  };

  const handleSwipeRight = () => {
    uiStore.setMenuState("right");
  };

  return (
    <MenuBarWrapper>
      <BackArrow
        onClick={() => {
          uiStore.setDirection("right");
          uiStore.setSelected(null);
        }}
      >
        <Arrow direction="top" size="40px" />
      </BackArrow>
      <Container>
        {uiStore.menuItems.length <= 2 ? (
          <Header>
            <Title position="left" scaling={scaleFullWidth(0)}>
              <div>{uiStore.menuItems[0].toUpperCase()}</div>
              <Arrow direction="right" onClick={() => uiStore.setSelected(1)} />
            </Title>
            <Title position="right" scaling={scaleFullWidth(1)}>
              <Arrow direction="left" onClick={() => uiStore.setSelected(0)} />
              <div>{uiStore.menuItems[1].toUpperCase()}</div>
            </Title>
          </Header>
        ) : (
          <>
            {uiStore.menuItems.map((item, index) => (
              <Header key={`${index}-menuitem`}>
                <Title
                  position={computeDirection(index)}
                  scaling={scaleFullWidth(index)}
                  id={`${index}-tab`}
                >
                  <Arrow direction="left" onClick={() => handleSwipeLeft()} />
                  <div>{item.toUpperCase()}</div>
                  <Arrow direction="right" onClick={() => handleSwipeRight()} />
                </Title>
              </Header>
            ))}
          </>
        )}
      </Container>
    </MenuBarWrapper>
  );
};

export default observer(MenuBar);
