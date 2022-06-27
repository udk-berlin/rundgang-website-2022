import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import LocalizedText from "modules/i18n/components/LocalizedText";
import LocalizedLink from "modules/i18n/components/LocalizedLink";
import LanguageSwitch from "./LanguageSwitch";
import { FOOTER_HEIGHT } from "@/utils/constants";

const FooterContainer = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  height: ${FOOTER_HEIGHT}px;
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

const SpecialLinks = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RestyledLink = styled(LocalizedLink)`
  &:hover {
    color: ${({ theme }) => theme.colors.darkgrey};
  }
`;
const NormalLink = styled.a`
  color: black;
  &:hover {
    color: ${({ theme }) => theme.colors.darkgrey};
  }
`;

const FooterBelow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  z-index: 600;
  width: 100%;
  height: 200px;
  background-color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  @media ${({ theme }) => theme.breakpoints.laptop} {
    display: none;
  }
`;
const FooterLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
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
        <SpecialLinks>
          <LinkWrapper hideMobile={true}>
            <RestyledLink to="/kontakt">
              <LocalizedText id="contact" />
            </RestyledLink>
          </LinkWrapper>
          <LinkWrapper hideMobile={true}>
            <NormalLink href="https://www.udk-berlin.de/schnellzugriff/impressum/">
              <LocalizedText id="imprint" />
            </NormalLink>
          </LinkWrapper>
          <LinkWrapper hideMobile={true}>
            <NormalLink href="https://www.udk-berlin.de/schnellzugriff/datenschutz/">
              <LocalizedText id="privacy" />
            </NormalLink>
          </LinkWrapper>
        </SpecialLinks>
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
            <RestyledLink to="/kontakt">
              <LocalizedText id="contact" />
            </RestyledLink>
          </LinkWrapper>
        </FooterLine>
        <FooterLine>
          <LinkWrapper>
            <NormalLink href="https://www.udk-berlin.de/schnellzugriff/impressum/">
              <LocalizedText id="imprint" />
            </NormalLink>
          </LinkWrapper>
          <LinkWrapper>
            <NormalLink href="https://www.udk-berlin.de/schnellzugriff/datenschutz/">
              <LocalizedText id="privacy" />
            </NormalLink>
          </LinkWrapper>
        </FooterLine>
      </FooterBelow>
    </FooterWrapper>
  );
};

export default observer(Footer);
