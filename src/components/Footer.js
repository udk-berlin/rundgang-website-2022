import React from "react";
import styled from "styled-components";
import LocalizedText from "modules/i18n/components/LocalizedText";
import LocalizedLink from "modules/i18n/components/LocalizedLink";

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
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

const Footer = () => {
  return (
    <FooterContainer>
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
