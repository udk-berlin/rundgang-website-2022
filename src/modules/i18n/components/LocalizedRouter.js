import React, { useMemo } from "react";
import { IntlProvider } from "react-intl";
import { useRouter } from "next/router";
import deFile from "../localizations/de.json";
import enFile from "../localizations/en.json";

const LocalizedRouter = ({ Component, pageProps }) => {
  const { locale } = useRouter();

  const messages = useMemo(() => {
    switch (locale) {
      case "de":
        return deFile;
      case "en":
        return enFile;
      default:
        return deFile;
    }
  }, [locale]);

  return (
    <IntlProvider locale={locale} messages={messages} onError={() => null}>
      <Component {...pageProps} />
    </IntlProvider>
  );
};
export default LocalizedRouter;
