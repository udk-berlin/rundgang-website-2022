import React from "react";
import styled from "styled-components";
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
  return (
    <Layout growing={0}>
      <IndexWrapper>
        <Stretch title="katalog" preferredSize={26}>
          <LinkWrapper>
            <LocalizedLink to="/katalog">
              &#8593;
              <LocalizedText id="katalog" />
            </LocalizedLink>
          </LinkWrapper>
        </Stretch>
        <Stretch title="orte" preferredSize={25}>
          <LinkWrapper>
            <LocalizedLink to="/orte">
              <LocalizedText id="orte" />
              &#8594;
            </LocalizedLink>
          </LinkWrapper>
        </Stretch>
        <Stretch title="zeiten" preferredSize={26}>
          <LinkWrapper>
            <LocalizedLink to="/zeiten">
              &#8592;
              <LocalizedText id="zeiten" />
            </LocalizedLink>
          </LinkWrapper>
        </Stretch>
        <Stretch title="beratungsangebote" preferredSize={12}>
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
