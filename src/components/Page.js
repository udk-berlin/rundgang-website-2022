import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react";
import styled from "styled-components";
import { useStores } from "../stores/index";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import PageTitle from "@/components/PageTitle";
import CursorLine from "@/components/CursorLine";
import useMediaQuery from "@/utils/useMediaQuery";
import JumpToTop from "@/components/JumpToTop";
import IntroAnimation from "@/components/IntroAnimation";

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  height: fit-content;
  z-index: 400;
  width: 100%;
  background: white;
`;

const PageWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const Page = ({ children }) => {
  const { dataStore, uiStore } = useStores();
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showLine, setShowLine] = useState(false);

  useEffect(() => {
    let pid = router.query.pid;
    setShowLine(false);
    if (dataStore.api?.root?.id) {
      if (pid) {
        dataStore.api.getIdFromLink(pid, true);
      } else if (
        dataStore.isLoaded &&
        router.pathname !== "/" &&
        !router.pathname.includes("[pid]")
      ) {
        let id = router.pathname.replaceAll("/", "").replaceAll("[pid]", "");
        uiStore.filterStore.handleReset();
        dataStore.api.getIdFromLink(id, true);
      } else if (
        dataStore.isLoaded &&
        dataStore.api.root &&
        !router.pathname.includes("[pid]")
      ) {
        uiStore.filterStore.handleReset();
        dataStore.api.getIdFromLink(dataStore.api.root.id, true);
      }
    }
  }, [router.query.pid, router.pathname, dataStore.api?.root?.id]);

  useEffect(() => {
    if (router.pathname == "/" && !isMobile) {
      setShowLine(true);
    }
  }, [router.pathname]);

  return (
    dataStore.api?.root?.id && (
      <>
        <HeaderWrapper>
          <PageTitle key={`PageTitle-${router.pathname}`} />
          <SearchBar key={`SearchBar-${router.pathname}`} />
        </HeaderWrapper>
        <PageWrapper>
          {children}
          {showLine ? <CursorLine /> : null}
          <IntroAnimation key={"intro"} />
          <Footer />
        </PageWrapper>
      </>
    )
  );
};
export default observer(Page);
