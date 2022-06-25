import React, { useMemo } from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";
import useWindowSize from "@/utils/useWindowSize";
import LocalizedText from "modules/i18n/components/LocalizedText";
import LocalizedLink from "modules/i18n/components/LocalizedLink";
import Layout from "@/components/simple/Layout";
import Stretch from "@/components/simple/Stretch";

const LinkWrapper = styled(LocalizedLink)`
  width: 100%;
  white-space: nowrap;
  &:hover {
    color: #333;
    
  }
`;
/* text-shadow: 5px 5px 20px #e2ff5d, -5px 5px 20px #e2ff5d,
      5px -5px 20px #e2ff5d, -5px -5px 20px #e2ff5d; */
const IndexWrapper = styled.div``;

const IndexPage = () => {
  const intl = useIntl();

  const size = useWindowSize();
  const isMobile = useMemo(() => size.width < 786, [size]);
  return (
    <Layout direction="right">
      <IndexWrapper>
        <LinkWrapper to="/katalog">
          <Stretch
            title={intl.formatMessage({ id: "katalog" })}
            preferredSize={isMobile ? 27 : 25.5}
            lineh={isMobile ? 0.77 : 0.88}
            arrowDir="top"
          >
            <LocalizedText id="katalog" />
          </Stretch>
        </LinkWrapper>
        <LinkWrapper to="/orte">
          <Stretch
            title={intl.formatMessage({ id: "orte" })}
            preferredSize={isMobile ? 27 : 25.5}
            lineh={isMobile ? 0.77 : 0.88}
            arrowDir="right"
          >
            <LocalizedText id="orte" />
          </Stretch>
        </LinkWrapper>
        <LinkWrapper to="/zeiten">
          <Stretch
            title={intl.formatMessage({ id: "zeiten" })}
            preferredSize={isMobile ? 27 : 25.5}
            lineh={isMobile ? 0.77 : 0.88}
            arrowDir="left"
          >
            <LocalizedText id="zeiten" />
          </Stretch>
        </LinkWrapper>
        <LinkWrapper to="/katalog/beratungsangebote">
          <Stretch
            title={intl.formatMessage({ id: "beratungsangebote" })}
            preferredSize={11}
            lineh={isMobile ? 0.77 : 0.88}
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
