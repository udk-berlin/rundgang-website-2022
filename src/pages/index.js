import React, { useMemo } from "react";
import styled from "styled-components";
import useMediaQuery from "@/utils/useMediaQuery";
import { useIntl } from "react-intl";
import LocalizedText from "modules/i18n/components/LocalizedText";
import LocalizedLink from "modules/i18n/components/LocalizedLink";
import Layout from "@/components/simple/Layout";
import Stretch from "@/components/simple/Stretch/index";

const LinkWrapper = styled(LocalizedLink)`
  width: 100%;
  height: fit-content;
  white-space: nowrap;
  display: flex;
  justify-content: flex-start;
  &:hover {
    color: #333;
  }
`;
const IndexWrapper = styled.div`
  height: calc(100vh - 130px);
  overflow-x: hidden;
`;

const IndexPage = () => {
  const intl = useIntl();
  const isMobile = useMediaQuery(
    "only screen and (max-width:768px) and (orientation:portrait)",
  );
  return (
    <Layout showToTop={false}>
      <IndexWrapper>
        <LinkWrapper to="/katalog">
          <Stretch
            arrowDir="top"
            titleId={intl.formatMessage({ id: "katalog" })}
            preferredSize={isMobile ? 24.5 : 26.5}
          >
            <LocalizedText id="katalog" />
          </Stretch>
        </LinkWrapper>
        <LinkWrapper to="/orte">
          <Stretch
            titleId={intl.formatMessage({ id: "orte" })}
            preferredSize={isMobile ? 24.5 : 26.5}
            arrowDir="right"
          >
            <LocalizedText id="orte" />
          </Stretch>
        </LinkWrapper>
        <LinkWrapper to="/zeiten">
          <Stretch
            titleId={intl.formatMessage({ id: "zeiten" })}
            preferredSize={isMobile ? 24.5 : 26.5}
            arrowDir="left"
          >
            <LocalizedText id="zeiten" />
          </Stretch>
        </LinkWrapper>
        <LinkWrapper to="/katalog/beratungsangebote">
          <Stretch
            titleId={intl.formatMessage({ id: "beratungsangebote" })}
            preferredSize={isMobile ? 11 : 10}
            arrowDir="bottom"
          >
            <LocalizedText id="beratungsangebote_index" />
          </Stretch>
        </LinkWrapper>
      </IndexWrapper>
    </Layout>
  );
};

export default IndexPage;
