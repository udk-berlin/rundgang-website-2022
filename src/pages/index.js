import React from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";
import LocalizedText from "modules/i18n/components/LocalizedText";
import LocalizedLink from "modules/i18n/components/LocalizedLink";
import Layout from "@/components/simple/Layout";
import Stretch from "@/components/simple/Stretch";

const LinkWrapper = styled.div`
  width: fit-content;
`;

const IndexWrapper = styled.div`
  overflow: hidden;
`;

const IndexPage = () => {
  const intl = useIntl();
  return (
    <Layout growing={0} direction="right">
      <IndexWrapper>
        <Stretch
          title={intl.formatMessage({ id: "katalog" })}
          preferredSize={29}
          arrowDir="top"
        >
          <LinkWrapper>
            <LocalizedLink to="/katalog">
              <LocalizedText id="katalog" />
            </LocalizedLink>
          </LinkWrapper>
        </Stretch>
        <Stretch
          title={intl.formatMessage({ id: "orte" })}
          preferredSize={29}
          arrowDir="right"
        >
          <LinkWrapper>
            <LocalizedLink to="/orte">
              <LocalizedText id="orte" />
            </LocalizedLink>
          </LinkWrapper>
        </Stretch>
        <Stretch
          title={intl.formatMessage({ id: "zeiten" })}
          preferredSize={29}
          arrowDir="left"
        >
          <LinkWrapper>
            <LocalizedLink to="/zeiten">
              <LocalizedText id="zeiten" />
            </LocalizedLink>
          </LinkWrapper>
        </Stretch>
        <Stretch
          title={intl.formatMessage({ id: "beratungsangebote" })}
          preferredSize={12}
          arrowDir="bottom"
        >
          <LinkWrapper>
            <LocalizedLink to="/katalog/beratungsangebote">
              <LocalizedText id="beratungsangebote_index" />
            </LocalizedLink>
          </LinkWrapper>
        </Stretch>
      </IndexWrapper>
    </Layout>
  );
};

export default IndexPage;
