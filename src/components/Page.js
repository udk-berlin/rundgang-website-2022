import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react";
import styled from "styled-components";
import { useStores } from "../stores/index";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import PageTitle from "@/components/PageTitle";
import IntroAnimation from "@/components/IntroAnimation";
import HeadOG from "./HeadOG";
import LocalizedText from "modules/i18n/components/LocalizedText";

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  height: fit-content;
  z-index: 400;
  background: white;
  width: calc(100% - 32px);
  margin: auto;
`;

const PageWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const LoadWrapper = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  background-color: #e2ff5d;
`;

const Page = ({ children }) => {
  const { dataStore, uiStore } = useStores();
  const router = useRouter();

  useEffect(() => {
    let pid = router.query.pid;
    if (dataStore.api?.isLoaded) {
      if (pid) {
        dataStore.api.getIdFromLink(pid, true);
      } else if (
        router.pathname !== "/" &&
        !router.pathname.includes("[pid]")
      ) {
        let id = router.pathname.replaceAll("/", "").replaceAll("[pid]", "");
        dataStore.api.getIdFromLink(id, true);
      } else if (dataStore.api.root && !router.pathname.includes("[pid]")) {
        uiStore.filterStore.handleReset();
        dataStore.api.getIdFromLink(dataStore.api.root.id, true);
      }
    }
  }, [
    router.query.pid,
    router.pathname,
    dataStore.api?.root?.id,
    dataStore.api?.isLoaded,
  ]);

  useEffect(() => {
    if (dataStore.api.currentRoot) {
      uiStore.setTitle(
        dataStore.api.currentRoot.name,
        dataStore.api.currentRoot.id,
      );
    }
  }, [dataStore?.api?.currentRoot?.name]);

  return (
    <>
      <HeadOG
        imgurl={uiStore?.currentContext?.thumbnail ?? "/assets/img/ogimage.png"}
        title={uiStore.title}
        description={
          uiStore?.currentContext?.description?.default ??
          "See projects and events..."
        }
        ogurl={`https://rundgang.udk-berlin.de${router.asPath}`}
      />
      <HeaderWrapper>
        <PageTitle loaded={dataStore.api.isLoaded} />
        <SearchBar />
      </HeaderWrapper>
      <PageWrapper>
        {dataStore.api.isLoaded ? (
          children
        ) : (
          <LoadWrapper>
            <LocalizedText id="loading" />
          </LoadWrapper>
        )}
        <Footer />
        <IntroAnimation key={"intro"} />
      </PageWrapper>
    </>
  );
};
export default observer(Page);
