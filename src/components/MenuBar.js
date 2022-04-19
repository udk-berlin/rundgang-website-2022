import React, { useState } from "react";
import styled from "styled-components";
import { useStores } from "../stores/index";
import { observer } from "mobx-react";
import Arrow from "./Arrow";

const MENUITEMS = ["orte", "zeiten", "alles"];
const SCALE_FACTOR = MENUITEMS.length < 3 ? 4.25 : 3.35;

const Title = styled.div`
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

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  background-color: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.colors.primary};
  overflow-x: hidden;
  font-family: "Helvetica";
`;

const Header = styled.div`
  display: flex;
  width: 100%;
`;

const MenuBar = () => {
  const [selected, setSelected] = useState(0);
  const [previous, setPrevious] = useState(null);

  const scaleFullWidth = index =>
    selected == index
      ? `scaleX(${SCALE_FACTOR / Math.log(MENUITEMS[index].length)}) `
      : "scaleX(0)";

  const handleSwipeRight = () => {
    setPrevious(selected);
    setSelected(selected >= MENUITEMS.length ? 0 : selected + 1);
  };

  const handleSwipeLeft = () => {
    setPrevious(selected);
    setSelected(selected == 0 ? MENUITEMS.length - 1 : selected - 1);
  };
  //const { uiStore } = useStores();

  return (
    <Container>
      {MENUITEMS.length <= 2 ? (
        <Header>
          <Title position="left" scaling={scaleFullWidth(0)}>
            <div>{MENUITEMS[0].toUpperCase()}</div>
            <Arrow direction="right" onClick={() => setSelected(1)} />
          </Title>
          <Title position="right" scaling={scaleFullWidth(1)}>
            <Arrow direction="left" onClick={() => setSelected(0)} />
            <div>{MENUITEMS[1].toUpperCase()}</div>
          </Title>
        </Header>
      ) : (
        <>
          {MENUITEMS.map((item, index) => (
            <Header>
              <Title
                position={
                  (previous &&
                    index < previous &&
                    selected < previous &&
                    previous < MENUITEMS.length - 1) ||
                  (previous &&
                    index > previous &&
                    selected > previous &&
                    previous == 0)
                    ? "right"
                    : "left"
                }
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
      )
    </Container>
  );
};

export default observer(MenuBar);
