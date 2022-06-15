import React, { useMemo, useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import { useRouter } from "next/router";
import deFile from "modules/i18n/localizations/de.json";
import enFile from "modules/i18n/localizations/en.json";
import { Provider } from "mobx-react";
import styled, { ThemeProvider } from "styled-components";
import { MotionConfig, AnimatePresence } from "framer-motion";
import { theme } from "theme/index";
import GlobalStyle from "theme/globalStyle";
import GlobalFonts from "public/fonts/globalFonts";
import { useStoreInstances } from "../stores/index";
import Footer, { FOOTER_HEIGHT } from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import PageTitle from "@/components/PageTitle";
import CursorLine from "@/components/CursorLine";
import { useIsMobile } from "@/utils/useWindowSize";
import { makeUrlFromId } from "@/utils/idUtils";
import JumpToTop from "@/components/JumpToTop";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 200;
`;

export default function App({ Component, pageProps }) {
  const { data } = pageProps;
  const snapshot = data?.dataStore;
  const { dataStore, uiStore } = useStoreInstances(snapshot);
  const router = useRouter();
  const isMobile = useIsMobile();
  const [showLine, setShowLine] = useState(false);

  const messages = useMemo(() => {
    switch (router.locale) {
      case "de":
        return deFile;
      case "en":
        return enFile;
      default:
        return deFile;
    }
  }, [router.locale]);

  useEffect(() => {
    dataStore.initialize();
  }, []);

  useEffect(() => {
    if (dataStore.api.isLoaded) {
      uiStore.initialize();
    }
  }, [dataStore.api.isLoaded]);

  useEffect(() => {
    let pid = router.query.pid;
    setShowLine(false);
    if (pid && dataStore.api.isLoaded) {
      dataStore.api.getIdFromLink(pid, true);
    } else if (router.pathname !== "/") {
      let id = router.pathname.replaceAll("/", "").replaceAll("[pid]", "");
      uiStore.filterStore.handleReset();
      dataStore.api.getIdFromLink(id, true);
    } else if (dataStore.api.root) {
      uiStore.filterStore.handleReset();
      dataStore.api.getIdFromLink(dataStore.api.root.id, true);
    }
  }, [router.query, router.pathname, dataStore.api.isLoaded]);

  useEffect(() => {
    if (router.pathname == "/" && !isMobile) {
      setShowLine(true);
    }
  }, [router.pathname]);

  return (
    <>
      <GlobalFonts />
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Provider dataStore={dataStore} uiStore={uiStore}>
          <IntlProvider
            locale={router.locale}
            messages={messages}
            onError={() => null}
          >
            <MotionConfig reducedMotion="user">
              <Container>
                <HeaderWrapper>
                  <PageTitle key={`PageTitle-${router.pathname}`} />
                  <SearchBar key={`SearchBar-${router.pathname}`} />
                </HeaderWrapper>
                <AnimatePresence exitBeforeEnter initial={true}>
                  <Component key={router.pathname} {...pageProps} />
                </AnimatePresence>
                {showLine ? <CursorLine /> : null}
                {showLine ? null : <JumpToTop />}
              </Container>
              <Footer />
            </MotionConfig>
          </IntlProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
}
