import styled from "styled-components";
import { observer } from "mobx-react";
import SearchBar from "@/components/SearchBar";
import { useStores } from "@/stores/index";
import MenuBar from "@/components/MenuBar";
import LocalizedText from "modules/i18n/components/LocalizedText";
import TestComponent from "@/components/TestComponent";

const HomeWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const ScaleHome = styled.div`
  transition: transform 1s, width 1s, height 2s;
  transform: ${({ visible }) =>
    visible ? "scaleX(1) scaleY(1)" : "scaleX(0) scaleY(0)"};
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

const TitleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const DefaultLink = styled.div`
  width: fit-content;
  height: fit-content;
  transform-origin: top left;
  line-height: 1;
  cursor: pointer;
`;

const OrteLink = styled(DefaultLink)`
  font-size: 10vw;
  transform: scaleX(2.95);
`;
const ZeitenLink = styled(DefaultLink)`
  font-size: 9vw;
  transform: scaleX(2.62);
`;
const KatalogLink = styled(DefaultLink)`
  font-size: 8vw;
  transform: scaleX(2.3);
`;
const MehrLink = styled(DefaultLink)`
  font-size: 3vw;
  transform: scaleX(1.62);
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 16px;
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
        <TestComponent />
      </ScalePage>
      <ScaleHome
        visible={uiStore.selected == null}
        direction={uiStore.direction}
      >
        <TitleWrapper>
          <DefaultLink
            style={{
              fontSize: "3vw",
              height: "6vw",
              transform: "scaleX(0.7)",
              padding: "6px",
            }}
          >
            20.-22.JULI
          </DefaultLink>
          <DefaultLink
            style={{
              fontSize: "6vw",
              transform: "scaleX(2.6)",
              transformOrigin: "top right",
              position: "fixed",
              right: 0,
            }}
          >
            RUNDGANG
          </DefaultLink>
          <DefaultLink
            style={{
              fontSize: "2vw",
              height: "6vw",
              transform: "scaleX(3)",
              paddingTop: "3.1vw",
              position: "fixed",
              left: 0,
            }}
          >
            UdK
          </DefaultLink>
        </TitleWrapper>
        <SearchBar />
        <KatalogLink onClick={() => handleClickLink("katalog", "right")}>
          <LocalizedText id="katalog" /> &#8593;
        </KatalogLink>
        <OrteLink onClick={() => handleClickLink("orte", "left")}>
          {"<-"}
          <LocalizedText id="orte" />
        </OrteLink>
        <ZeitenLink onClick={() => handleClickLink("zeiten", "right")}>
          <LocalizedText id="zeiten" />
          {"->"}
        </ZeitenLink>
        <MehrLink onClick={() => handleClickLink("mehr", "down")}>
          &#8595; <LocalizedText id="advice" />
        </MehrLink>
        <Footer>
          <div>
            <LocalizedText id="imprint" />
          </div>
          <div>
            <LocalizedText id="privacy" />
          </div>
          <div>
            <LocalizedText id="contact" />
          </div>
        </Footer>
      </ScaleHome>
    </HomeWrapper>
  );
};
export default observer(Home);
