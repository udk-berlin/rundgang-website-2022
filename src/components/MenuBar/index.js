import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import useWindowSize from "@/hooks/useWindowSize";
import StretchSqueeze from "../StretchSqueezeUhh";
import LocalizedText from "modules/i18n/components/LocalizedText";

const MenuBarWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  font-family: "Diatype";
`;
const Arrow = styled.span`
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const BackArrow = styled.div`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  z-index: 10;
  font-size: 5vw;
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

const Header = styled.div`
  display: flex;
  width: ${({ width }) => `${width}px`};
  height: 10vw;
  overflow: hidden;
`;

const Title = styled.div`
  display: flex;
`;

const MenuBar = () => {
  const { uiStore } = useStores();
  const size = useWindowSize();

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
      <Container>
        {uiStore.menuItems.length == 1 && uiStore.selected !== null ? (
          <Header width={size.width}>
            <StretchSqueeze position="left" fontSize={10}>
              <Title>
                <Arrow onClick={() => uiStore.setSelected(null)}>{"<-"}</Arrow>
                <LocalizedText id={uiStore.selectedItem} />
              </Title>
            </StretchSqueeze>
          </Header>
        ) : (
          <Header width={size.width}>
            <BackArrow
              onClick={() => {
                uiStore.setDirection("right");
                uiStore.setSelected(null);
              }}
            >
              &#8598;
            </BackArrow>
            {uiStore.menuItems.map((item, index) => (
              <StretchSqueeze
                position={computeDirection(index)}
                fontSize={10}
                visible={index == uiStore.selected}
                key={`${index}-menuitem`}
                id={`${index}-tab`}
              >
                <Title>
                  <Arrow onClick={() => handleSwipeLeft()}>{"<-"}</Arrow>
                  <LocalizedText id={item} />
                  <Arrow onClick={() => handleSwipeRight()}>{"->"}</Arrow>
                </Title>
              </StretchSqueeze>
            ))}
          </Header>
        )}
      </Container>
    </MenuBarWrapper>
  );
};

export default observer(MenuBar);
