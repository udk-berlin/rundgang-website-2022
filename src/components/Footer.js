import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { useRouter } from "next/router";
import LocalizedText from "modules/i18n/components/LocalizedText";
import LocalizedLink from "modules/i18n/components/LocalizedLink";

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${({ theme }) => theme.fontSizes.md};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};

  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

const LinkWrapper = styled.div`
  padding: ${({ theme }) => ` 0 ${theme.spacing.sm}`};
  flex-grow: ${({ grow }) => grow};
`;

const RestyledLink = styled(LocalizedLink)`
  &:hover {
    color: #888;
  }
`;

const LanguageSwitch = styled(LinkWrapper)`
  display: flex;
`;
const LanguageItem = styled.div`
  cursor: pointer;
  color: ${({ selected }) => (selected ? "#000000" : "#888888")};
`;

const FooterBelow = styled.div`
  position: sticky;
  top: 100vh;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${({ theme }) => theme.fontSizes.xl};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};

  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

const Footer = () => {
  const router = useRouter();
  return (
    <>
      <FooterContainer>
        <LinkWrapper grow={0}>
          <RestyledLink to="/">
            <LocalizedText id="maintitle" />
          </RestyledLink>
        </LinkWrapper>
        <LinkWrapper grow={0}>23.-24.07.2022</LinkWrapper>
        {router.pathname == "/" ? (
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
        ) : null}

        {router.pathname == "/" ? (
          <LinkWrapper grow={0}>
            <RestyledLink to="/imprint">
              <LocalizedText id="imprint" />
            </RestyledLink>
          </LinkWrapper>
        ) : null}
      </FooterContainer>
      {router.pathname !== "/" ? (
        <FooterBelow>
          <LinkWrapper grow={1}>
            <RestyledLink to="/">
              <LocalizedText id="maintitle" />
            </RestyledLink>
          </LinkWrapper>
          <LinkWrapper grow={1}>23.-24.07.2022</LinkWrapper>
          <LanguageSwitch grow={1}>
            <LanguageItem
              onClick={() => {
                router.push(router.pathname, router.pathname, {
                  locale: "en",
                });
              }}
              selected={router.locale == "en"}
            >
              EN
            </LanguageItem>
            |
            <LanguageItem
              onClick={() => {
                router.push(router.pathname, router.pathname, {
                  locale: "de",
                });
              }}
              selected={router.locale == "de"}
            >
              DE
            </LanguageItem>
          </LanguageSwitch>

          <LinkWrapper grow={0}>
            <RestyledLink to="/imprint" shadowing={true}>
              <LocalizedText id="imprint" />
            </RestyledLink>
          </LinkWrapper>
        </FooterBelow>
      ) : null}
    </>
  );
};

export default observer(Footer);
