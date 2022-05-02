import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import LocalizedText from "modules/i18n/components/LocalizedText";
import LocalizedLink from "modules/i18n/components/LocalizedLink";

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const LinkWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const LanguageSwitch = styled(LinkWrapper)`
  display: flex;
`;
const LanguageItem = styled.div`
  cursor: pointer;
  color: ${({ selected }) => (selected ? "#000000" : "#888888")};
`;

const Footer = () => {
  const router = useRouter();
  return (
    <FooterContainer>
      <LanguageSwitch>
        <LanguageItem
          onClick={() => {
            router.push(router.pathname, router.pathname, { locale: "en" });
          }}
          selected={router.locale == "en"}
        >
          EN
        </LanguageItem>
        <LanguageItem
          onClick={() => {
            router.push(router.pathname, router.pathname, { locale: "de" });
          }}
          selected={router.locale == "de"}
        >
          DE
        </LanguageItem>
      </LanguageSwitch>
      <LinkWrapper>
        <LocalizedLink to="/">
          <LocalizedText id="maintitle" />
        </LocalizedLink>
      </LinkWrapper>
      <LinkWrapper>
        <LocalizedLink to="/imprint">
          <LocalizedText id="imprint" />
        </LocalizedLink>
      </LinkWrapper>
      <LinkWrapper>
        <LocalizedLink to="/privacy">
          <LocalizedText id="privacy" />
        </LocalizedLink>
      </LinkWrapper>
    </FooterContainer>
  );
};

export default Footer;
