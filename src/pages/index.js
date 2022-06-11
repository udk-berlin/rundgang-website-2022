import React from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";
import LocalizedText from "modules/i18n/components/LocalizedText";
import LocalizedLink from "modules/i18n/components/LocalizedLink";
import Layout from "@/components/simple/Layout";
import Stretch from "@/components/simple/Stretch";

const LinkWrapper = styled(LocalizedLink)`
  width: fit-content;
  white-space: nowrap;
`;

const IndexWrapper = styled.div`
  overflow: hidden;
`;

const IndexPage = () => {
  const intl = useIntl();
  return (
    <Layout growing={0} direction="right">
      <IndexWrapper>
        <LinkWrapper to="/katalog">
          <Stretch
            title={intl.formatMessage({ id: "katalog" })}
            preferredSize={25.5}
            arrowDir="top"
          >
            <LocalizedText id="katalog" />
          </Stretch>
        </LinkWrapper>
        <LinkWrapper to="/orte">
          <Stretch
            title={intl.formatMessage({ id: "orte" })}
            preferredSize={25.5}
            arrowDir="right"
          >
            <LocalizedText id="orte" />
          </Stretch>
        </LinkWrapper>
        <LinkWrapper to="/zeiten">
          <Stretch
            title={intl.formatMessage({ id: "zeiten" })}
            preferredSize={25.5}
            arrowDir="left"
          >
            <LocalizedText id="zeiten" />
          </Stretch>
        </LinkWrapper>
        <LinkWrapper to="/katalog/beratungsangebote">
          <Stretch
            title={intl.formatMessage({ id: "beratungsangebote" })}
            preferredSize={11}
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
