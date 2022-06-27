import React, { useMemo } from "react";
import styled from "styled-components";
import useWindowSize from "@/utils/useWindowSize";
import { useIntl } from "react-intl";
import LocalizedText from "modules/i18n/components/LocalizedText";
import LocalizedLink from "modules/i18n/components/LocalizedLink";
import Layout from "@/components/simple/Layout";
import Stretch from "@/components/simple/Stretch";

const LinkWrapper = styled(LocalizedLink)`
  width: 100%;
  height: fit-content;
  white-space: nowrap;
  &:hover {
    color: #333;
  }
`;
const IndexWrapper = styled.div`
  height: calc(100vh - 160px);
  width: 100%;
  font-size: 20px;
`;

const IndexPage = () => {
  const size = useWindowSize();
  const intl = useIntl();
  const isMobile = useMemo(() => size.width < 786, [size]);
  return (
    <Layout direction="right">
      <IndexWrapper>
        <LinkWrapper to="/katalog">
          <Stretch
            arrowDir="top"
            titleId={intl.formatMessage({ id: "katalog" })}
            preferredSize={isMobile ? 27 : 25.5}
            lineh={isMobile ? 0.76 : 0.88}
          >
            <LocalizedText id="katalog" />
          </Stretch>
        </LinkWrapper>
        <LinkWrapper to="/orte">
          <Stretch
            titleId={intl.formatMessage({ id: "orte" })}
            preferredSize={isMobile ? 27 : 25.5}
            lineh={isMobile ? 0.76 : 0.88}
            arrowDir="right"
          >
            <LocalizedText id="orte" />
          </Stretch>
        </LinkWrapper>
        <LinkWrapper to="/zeiten">
          <Stretch
            titleId={intl.formatMessage({ id: "zeiten" })}
            preferredSize={isMobile ? 27 : 25.5}
            lineh={isMobile ? 0.76 : 0.88}
            arrowDir="left"
          >
            <LocalizedText id="zeiten" />
          </Stretch>
        </LinkWrapper>
        <LinkWrapper to="/katalog/beratungsangebote">
          <Stretch
            titleId={intl.formatMessage({ id: "beratungsangebote" })}
            preferredSize={11}
            lineh={isMobile ? 0.76 : 0.88}
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
