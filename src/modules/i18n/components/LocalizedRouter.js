import React, { useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import { LOCALES } from "../../../utils/multilanguage";
import deFile from "../localizations/de.json";
import enFile from "../localizations/en.json";

export const LocalizedRouter = ({
  children,
  defaultLanguage = LOCALES.de,
  language,
}) => {
  const [messages, setMessages] = useState({});
  const [lang, setLang] = useState(defaultLanguage);

  useEffect(() => {
    let isMounted = true; // note mutable flag

    const fetchData = async () => {
      if (isMounted) {
        setMessages({
          de: deFile,
          en: enFile,
        });
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (language) {
      setLang(language);
    }
  }, [language]);

  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
      {messages[lang] ? children : null}
    </IntlProvider>
  );
};
