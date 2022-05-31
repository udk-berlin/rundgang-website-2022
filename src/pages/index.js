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
          preferredSize={27.5}
          direction="right"
        >
          <LinkWrapper>
            <LocalizedLink to="/katalog">
              <span style={{ fontFamily: "Inter" }}>&#8593;</span>
              <LocalizedText id="katalog" />
            </LocalizedLink>
          </LinkWrapper>
        </Stretch>
        <Stretch
          title={intl.formatMessage({ id: "orte" })}
          preferredSize={27.5}
          direction="right"
        >
          <LinkWrapper>
            <LocalizedLink to="/orte">
              <LocalizedText id="orte" />
              <span style={{ fontFamily: "Inter" }}>&#8594;</span>
            </LocalizedLink>
          </LinkWrapper>
        </Stretch>
        <Stretch
          title={intl.formatMessage({ id: "zeiten" })}
          preferredSize={27.5}
          direction="right"
        >
          <LinkWrapper>
            <LocalizedLink to="/zeiten">
              <span style={{ fontFamily: "Inter" }}>&#8592;</span>
              <LocalizedText id="zeiten" />
            </LocalizedLink>
          </LinkWrapper>
        </Stretch>
        <Stretch
          title={intl.formatMessage({ id: "beratungsangebote" })}
          preferredSize={12}
          direction="right"
        >
          <LinkWrapper>
            <LocalizedLink to="/beratungsangebote">
              <LocalizedText id="beratungsangebote_index" />
              <span style={{ fontFamily: "Inter" }}>&#8595;</span>
            </LocalizedLink>
          </LinkWrapper>
        </Stretch>
      </IndexWrapper>
    </Layout>
  );
};

export default IndexPage;
