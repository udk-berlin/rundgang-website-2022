import styled from "styled-components";
import { observer } from "mobx-react";
import SearchBar from "@/components/SearchBar";
import { useStores } from "@/stores/index";
import MenuBar from "@/components/MenuBar";
import ArrowSvg from "@/components/Arrow";

const HomeWrapper = styled.div`
  width: 100%;
  height: 100%;
  font-family: "Helvetica";
  overflow-x: hidden;
`;

const ScaleHome = styled.div`
  transition: transform 1s, width 1s, height 2s;
  transform: ${({ visible }) => (visible ? "scaleX(1) scaleY(1)" : "scaleX(0) scaleY(0)")};
  width: ${({ visible }) => (visible ? "100%" : "0")};
  height: ${({ visible }) => (visible ? "100%" : "0")};
  justify-content: ${({ direction }) =>
    direction == "left" ? "flex-end" : "flex-start"};
  transform-origin: ${({ direction }) =>
    direction == "left" ? "top right" : "top left"};
`;

const ScalePage = styled.div`
  transition: transform 1s, height 1s;
  transform: ${({ visible }) => (visible ? "scaleX(1)" : "scaleX(0)")};
  height: ${({ visible }) => (visible ? "100%" : "0")};
  justify-content: ${({ direction }) =>
    direction == "right" ? "flex-end" : "flex-start"};
  transform-origin: ${({ direction }) =>
    direction == "right" ? "top right" : "top left"};
`;

const DefaultLink = styled.div`
  width: 100%;
  height: 100%;
  transform-origin: top left;
  cursor: pointer;
`;

const OrteLink = styled(DefaultLink)`
  font-size: 10vw;
  transform: scaleX(2.6);
`;
const ZeitenLink = styled(DefaultLink)`
  font-size: 9vw;
  transform: scaleX(2.5);
`;
const AllesLink = styled(DefaultLink)`
  font-size: 8vw;
  transform: scaleX(3.2);
`;

const Home = () => {
  const { uiStore } = useStores();

  const handleClickLink = (name, direction) => {
    uiStore.setSelectedFromLink(name);
    uiStore.setDirection(direction);
  };
  return (
    <HomeWrapper>
      <ScalePage
        visible={uiStore.selected !== null}
        direction={uiStore.direction}
      >
        <MenuBar />
      </ScalePage>
      <SearchBar />
      <ScaleHome
        visible={uiStore.selected == null}
        direction={uiStore.direction}
      >
        <OrteLink onClick={() => handleClickLink("orte", "right")}>
          ORTE <ArrowSvg size="9vw" direction="right" />
        </OrteLink>
        <ZeitenLink onClick={() => handleClickLink("zeiten", "left")}>
          <ArrowSvg size="8vw" direction="left" />
          ZEITEN
        </ZeitenLink>
        <AllesLink onClick={() => handleClickLink("alles", "right")}>
          ALLES
          <ArrowSvg size="7vw" direction="right" />
        </AllesLink>
      </ScaleHome>
      {uiStore.selected !== null ? "GUTEN TAG" : null}
    </HomeWrapper>
  );
};
export default observer(Home);
