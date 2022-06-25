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
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import PageTitle from "@/components/PageTitle";
import CursorLine from "@/components/CursorLine";
import { useIsMobile } from "@/utils/useWindowSize";
import JumpToTop from "@/components/JumpToTop";
import IntroAnimation from "@/components/IntroAnimation";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: inherit;
`;

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 400;
  width: 100%;
  background: inherit;
`;

export default function App({ Component, pageProps }) {
  const { data } = pageProps;
  const snapshot = data?.dataStore;
  const { dataStore, uiStore } = useStoreInstances(snapshot);
  const router = useRouter();
  const isMobile = useIsMobile();
  const [showLine, setShowLine] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

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
    if (dataStore.isLoaded) {
      uiStore.initialize();
    }
  }, [dataStore.isLoaded]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        dataStore.api.status === "success" ||
        dataStore.api.status === "error"
      ) {
        setShowIntro(false);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [router.pathname, dataStore.api.status]);

  useEffect(() => {
    let pid = router.query.pid;
    setShowLine(false);
    if (dataStore.isLoaded && pid) {
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
  }, [router.query.pid, router.pathname, dataStore.isLoaded]);

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
                {!showIntro && (
                  <>
                    <HeaderWrapper>
                      <PageTitle key={`PageTitle-${router.pathname}`} />
                      <SearchBar key={`SearchBar-${router.pathname}`} />
                    </HeaderWrapper>
                    <AnimatePresence exitBeforeEnter initial={true}>
                      <Component key={router.pathname} {...pageProps} />
                    </AnimatePresence>
                    {showLine ? null : <JumpToTop />}
                  </>
                )}
                {showLine ? <CursorLine /> : null}
                {showIntro && <IntroAnimation key={"intro"} />}
                <Footer />
              </Container>
            </MotionConfig>
          </IntlProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
}
