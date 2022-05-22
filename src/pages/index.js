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

const IndexPage = () => {
  return (
    <Layout growing={1}>
      <Stretch title="katalog" preferredSize={25}>
        <LinkWrapper>
          <LocalizedLink to="/katalog">
            <LocalizedText id="katalog" />
            &#8593;
          </LocalizedLink>
        </LinkWrapper>
      </Stretch>
      <Stretch title="orte" preferredSize={25}>
        <LinkWrapper>
          <LocalizedLink to="/orte">
            &#8592;
            <LocalizedText id="orte" />
          </LocalizedLink>
        </LinkWrapper>
      </Stretch>
      <Stretch title="zeiten" preferredSize={25}>
        <LinkWrapper>
          <LocalizedLink to="/zeiten">
            <LocalizedText id="zeiten" />
            &#8594;
          </LocalizedLink>
        </LinkWrapper>
      </Stretch>
      <Stretch title="beratungsangebote" preferredSize={11}>
        <LinkWrapper>
          <LocalizedLink to="/beratungsangebote">
            <LocalizedText id="beratungsangebote" />
            &#8595;
          </LocalizedLink>
        </LinkWrapper>
      </Stretch>
    </Layout>
  );
};

export default IndexPage;
