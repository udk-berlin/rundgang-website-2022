import React, { useCallback } from "react";
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
  width: fit-content;
`;

const BackArrow = styled.div`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  z-index: 10;
  font-size: 4vw;
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

  const computeDirection = useCallback(
    index => {
      if (uiStore.direction == "left" && index == uiStore.previous) {
        console.log("prev left", index);
        return "right";
      }
      if (uiStore.direction == "right" && index == uiStore.previous) {
        console.log("prev right", index);
        return "left";
      }
      if (uiStore.direction == "left" && index == uiStore.selected) {
        console.log("selected left", index);
        return "left";
      }
      if (uiStore.direction == "right" && index == uiStore.selected) {
        console.log("selected right", index);
        return "right";
      }
    },
    [uiStore.direction, uiStore.selected, uiStore.previous],
  );

  const handleSwipeLeft = () => {
    uiStore.setMenuState("left");
  };

  const handleSwipeRight = () => {
    uiStore.setMenuState("right");
  };

  return (
    <MenuBarWrapper>
      {uiStore.selected !== null && (
        <Container>
          {uiStore.menuItems.length == 1 ? (
            <Header width={size.width}>
              <StretchSqueeze position="left" fontSize={10}>
                <Title>
                  <Arrow onClick={() => uiStore.setSelected(null)}>
                    {"<-"}
                  </Arrow>
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
                  width={size.width}
                  visible={index == uiStore.selected}
                  key={`${index}-menuitem`}
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
      )}
    </MenuBarWrapper>
  );
};

export default observer(MenuBar);
