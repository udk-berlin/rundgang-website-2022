import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { useRouter } from "next/router";
import LocalizedText from "modules/i18n/components/LocalizedText";
import LocalizedLink from "modules/i18n/components/LocalizedLink";

const FooterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  @media ${({ theme }) => theme.breakpoints.md} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    height: ${({ theme }) => theme.spacing.xl};
  }
`;

const LinkWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  flex-grow: ${({ grow }) => grow};
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
      <LinkWrapper grow={1}>
        <LocalizedLink to="/">
          <LocalizedText id="maintitle" />
        </LocalizedLink>
      </LinkWrapper>
      <LanguageSwitch grow={0}>
        <LanguageItem
          onClick={() => {
            router.push(router.pathname, router.pathname, { locale: "en" });
          }}
          selected={router.locale == "en"}
        >
          EN
        </LanguageItem>
        |
        <LanguageItem
          onClick={() => {
            router.push(router.pathname, router.pathname, { locale: "de" });
          }}
          selected={router.locale == "de"}
        >
          DE
        </LanguageItem>
      </LanguageSwitch>
      <LinkWrapper grow={0}>
        <LocalizedLink to="/imprint">
          <LocalizedText id="imprint" />
        </LocalizedLink>
      </LinkWrapper>
      <LinkWrapper grow={0}>
        <LocalizedLink to="/privacy">
          <LocalizedText id="privacy" />
        </LocalizedLink>
      </LinkWrapper>
    </FooterContainer>
  );
};

export default observer(Footer);
