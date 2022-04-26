import styled from "styled-components";
import { observer } from "mobx-react";
import SearchBar from "@/components/SearchBar";
import { useStores } from "@/stores/index";
import MenuBar from "@/components/MenuBar";
import LocalizedText from "modules/i18n/components/LocalizedText";
import StretchSqueeze from "@/components/StretchSqueezeUhh";

const HomeWrapper = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const SearchBarWrapper = styled.div`
  transform: ${({ visible }) => (visible ? "scaleY(1)" : "scaleY(0)")};
  height: ${({ visible }) => (visible ? "fit-content" : "0px")};
`;

const DefaultLink = styled.div`
  cursor: pointer;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
`;

const Home = () => {
  const { uiStore } = useStores();
  const handleClickLink = (name, dir) => {
    if (name in uiStore.menuItems) {
      uiStore.setDirection(dir);
      uiStore.setSelectedFromLink(name);
    } else {
      uiStore.setMenuItems([name]);
      uiStore.setDirection(dir);
      uiStore.setSelectedFromLink(name);
    }
  };
  return (
    <HomeWrapper>
      <SearchBarWrapper visible={uiStore.selected !== null}>
        <MenuBar />
      </SearchBarWrapper>
      <StretchSqueeze
        visible={uiStore.selected == null}
        position="left"
        fontSize={3}
      >
        20.-22.JULI UdK RUNDGANG
      </StretchSqueeze>
      <SearchBar />
      <StretchSqueeze
        position="top"
        fontSize={7}
        visible={uiStore.selected == null}
      >
        <DefaultLink onClick={() => handleClickLink("katalog", "top")}>
          <LocalizedText id="katalog" /> &#8593;
        </DefaultLink>
      </StretchSqueeze>
      <StretchSqueeze
        position="left"
        fontSize={9}
        visible={uiStore.selected == null}
      >
        <DefaultLink onClick={() => handleClickLink("orte", "left")}>
          {"<-"}
          <LocalizedText id="orte" />
        </DefaultLink>
      </StretchSqueeze>
      <StretchSqueeze
        position="right"
        fontSize={8}
        visible={uiStore.selected == null}
      >
        <DefaultLink onClick={() => handleClickLink("zeiten", "right")}>
          <LocalizedText id="zeiten" />
          {"->"}
        </DefaultLink>
      </StretchSqueeze>
      <StretchSqueeze
        position="bottom"
        fontSize={3}
        visible={uiStore.selected == null}
      >
        <DefaultLink onClick={() => handleClickLink("advice", "bottom")}>
          &#8595; <LocalizedText id="advice" />
        </DefaultLink>
      </StretchSqueeze>
      <StretchSqueeze
        position="left"
        fontSize={2}
        visible={uiStore.selected == null}
      >
        <Footer>
          <DefaultLink onClick={() => handleClickLink("imprint", "left")}>
            &#12308;
            <LocalizedText id="imprint" />
            &#12309;
          </DefaultLink>
          <DefaultLink onClick={() => handleClickLink("privacy", "left")}>
            &#12308;
            <LocalizedText id="privacy" />
            &#12309;
          </DefaultLink>
          <DefaultLink onClick={() => handleClickLink("contact", "left")}>
            &#12308;
            <LocalizedText id="contact" />
            &#12309;
          </DefaultLink>
        </Footer>
      </StretchSqueeze>
    </HomeWrapper>
  );
};
export default observer(Home);
