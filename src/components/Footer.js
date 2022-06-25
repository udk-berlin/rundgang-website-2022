import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import LocalizedText from "modules/i18n/components/LocalizedText";
import LocalizedLink from "modules/i18n/components/LocalizedLink";
import LanguageSwitch from "./LanguageSwitch";

export const FOOTER_HEIGHT = 30;

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  height: ${FOOTER_HEIGHT}px;
  width: inherit;
  background-color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  z-index: 100;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    z-index: 1;
  }
`;

const LinkWrapper = styled.div`
  padding: ${({ theme }) => ` 0 ${theme.spacing.sm}`};
  flex-grow: 0;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    display: ${({ hideMobile }) => (hideMobile ? "none" : "block")};
  }
`;

const RestyledLink = styled(LocalizedLink)`
  &:hover {
    color: ${({ theme }) => theme.colors.darkgrey};
  }
`;

const FooterBelow = styled.div`
  position: relative;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  display: none;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    display: block;
    z-index: 10;
  }
`;
const FooterLine = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: ${({ theme }) => theme.spacing.sm};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FooterWrapper = styled.div`
  width: 100%;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <LinkWrapper>
          <RestyledLink to="/">
            <LocalizedText id="footer_title" />
          </RestyledLink>
        </LinkWrapper>
        <LinkWrapper>
          <LocalizedText id="footer_date" />
        </LinkWrapper>
        <LinkWrapper hideMobile={true}>
          <LanguageSwitch />
        </LinkWrapper>
        <LinkWrapper hideMobile={true}>
          <RestyledLink to="/imprint">
            <LocalizedText id="imprint" />
          </RestyledLink>
        </LinkWrapper>
      </FooterContainer>
      <FooterBelow>
        <FooterLine>
          <LinkWrapper>
            <RestyledLink to="/">
              <LocalizedText id="footer_title" />
            </RestyledLink>
          </LinkWrapper>
          <LinkWrapper>
            <LocalizedText id="footer_date" />
          </LinkWrapper>
        </FooterLine>
        <FooterLine>
          <LinkWrapper>
            <LanguageSwitch />
          </LinkWrapper>
          <LinkWrapper>
            <RestyledLink to="/imprint">
              <LocalizedText id="imprint" />
            </RestyledLink>
          </LinkWrapper>
        </FooterLine>
      </FooterBelow>
    </FooterWrapper>
  );
};

export default observer(Footer);
