import React from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";
import LocalizedText from "modules/i18n/components/LocalizedText";
import LocalizedLink from "modules/i18n/components/LocalizedLink";
import Layout from "@/components/simple/Layout";
import Stretch from "@/components/simple/Stretch";

const LinkWrapper = styled.div`
  width: fit-content;
  display: flex;
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
        <Stretch
          title={intl.formatMessage({ id: "katalog" })}
          preferredSize={26}
          direction="right"
        >
          <LinkWrapper>
            <LocalizedLink to="/katalog">
              &#8593;
              <LocalizedText id="katalog" />
            </LocalizedLink>
          </LinkWrapper>
        </Stretch>
        <Stretch
          title={intl.formatMessage({ id: "orte" })}
          preferredSize={25}
          direction="right"
        >
          <LinkWrapper>
            <LocalizedLink to="/orte">
              <LocalizedText id="orte" />
              &#8594;
            </LocalizedLink>
          </LinkWrapper>
        </Stretch>
        <Stretch
          title={intl.formatMessage({ id: "zeiten" })}
          preferredSize={26}
          direction="right"
        >
          <LinkWrapper>
            <LocalizedLink to="/zeiten">
              &#8592;
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
              <LocalizedText id="beratungsangebote" />
              &#8595;
            </LocalizedLink>
          </LinkWrapper>
        </Stretch>
      </IndexWrapper>
    </Layout>
  );
};

export default IndexPage;
