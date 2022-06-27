import React, { useMemo } from "react";
import styled from "styled-components";
import useWindowSize from "@/utils/useWindowSize";
import LocalizedText from "modules/i18n/components/LocalizedText";
import LocalizedLink from "modules/i18n/components/LocalizedLink";
import Layout from "@/components/simple/Layout";
import Stretch from "@/components/simple/Stretch2";

const LinkWrapper = styled(LocalizedLink)`
  width: 100%;
  height: fit-content;
  white-space: nowrap;
  &:hover {
    color: #333;
  }
`;
const IndexWrapper = styled.div`
  height: calc(100vh - 180px);
  width: 100%;
  font-size: 20px;
`;

const IndexPage = () => {
  const size = useWindowSize();
  const h = size.height ?? 0;
  const isMobile = useMemo(() => size.width < 786, [size]);
  return (
    <Layout direction="right">
      <IndexWrapper>
        <LinkWrapper to="/katalog">
          <Stretch arrowDir="top" height={0.3 * (h - 170)}>
            <LocalizedText id="katalog" />
          </Stretch>
        </LinkWrapper>
        <LinkWrapper to="/orte">
          <Stretch arrowDir="right" height={0.3 * (h - 170)}>
            <LocalizedText id="orte" />
          </Stretch>
        </LinkWrapper>
        <LinkWrapper to="/zeiten">
          <Stretch
            lineh={isMobile ? 0.7 : 1}
            arrowDir="left"
            height={0.3 * (h - 170)}
          >
            <LocalizedText id="zeiten" />
          </Stretch>
        </LinkWrapper>
        <LinkWrapper to="/katalog/beratungsangebote">
          <Stretch arrowDir="bottom" height={0.1 * (h - 170)}>
            <LocalizedText id="beratungsangebote_index" />
          </Stretch>
        </LinkWrapper>
      </IndexWrapper>
    </Layout>
  );
};

export default IndexPage;
