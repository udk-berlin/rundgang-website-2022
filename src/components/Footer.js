import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import LocalizedText from "modules/i18n/components/LocalizedText";
import LocalizedLink from "modules/i18n/components/LocalizedLink";
import LanguageSwitch from "./LanguageSwitch";

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  z-index: 100;
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
  padding-top: ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  display: none;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    display: flex;
  }
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
        <LinkWrapper>
          <LanguageSwitch />
        </LinkWrapper>
        <LinkWrapper>
          <RestyledLink to="/imprint">
            <LocalizedText id="imprint" />
          </RestyledLink>
        </LinkWrapper>
      </FooterBelow>
    </FooterWrapper>
  );
};

export default observer(Footer);
