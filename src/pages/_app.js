import React, { useMemo } from "react";
import { IntlProvider } from "react-intl";
import { useRouter } from "next/router";
import deFile from "modules/i18n/localizations/de.json";
import enFile from "modules/i18n/localizations/en.json";
import { Provider } from "mobx-react";
import { ThemeProvider } from "styled-components";
import { theme } from "theme/index";
import GlobalStyle from "theme/globalStyle";
import { useStoreInstances } from "../stores/index";
import Page from "../components/Page";

export default function App({ Component, pageProps }) {
  const { data } = pageProps;
  const snapshot = data?.dataStore;
  const { dataStore, uiStore } = useStoreInstances(snapshot);
  const router = useRouter();

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

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Provider dataStore={dataStore} uiStore={uiStore}>
          <IntlProvider
            locale={router.locale}
            messages={messages}
            onError={() => null}
          >
            <Page>
              <Component key={router.pathname} {...pageProps} />
            </Page>
          </IntlProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
}
