import React from "react";
import styled from "styled-components";
import LocalizedText from "modules/i18n/components/LocalizedText";
import LocalizedLink from "modules/i18n/components/LocalizedLink";
import Layout from "@/components/Layout";
import { Container } from "@/theme/reusedStyles";

const IndexContainer = styled(Container)``;

const LinkWrapper = styled.div`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
`;

const IndexPage = () => {
  return (
    <Layout>
      <IndexContainer>
        <LinkWrapper>
          <LocalizedLink to="/katalog">
            <LocalizedText id="katalog" /> &#8593;
          </LocalizedLink>
        </LinkWrapper>
        <LinkWrapper>
          <LocalizedLink to="/orte">
            {"<-"}
            <LocalizedText id="orte" />
          </LocalizedLink>
        </LinkWrapper>
        <LinkWrapper>
          <LocalizedLink to="/zeiten">
            <LocalizedText id="zeiten" />
            {"->"}
          </LocalizedLink>
        </LinkWrapper>
      </IndexContainer>
    </Layout>
  );
};

export default IndexPage;
