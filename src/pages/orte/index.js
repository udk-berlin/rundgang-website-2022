import React from "react";
import styled from "styled-components";
import { useStores } from "@/stores/index";
import Layout from "@/components/simple/Layout";
import Map from "@/components/Map";
import ListView from "@/components/ListView";

const OrteWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const OrteKatalog = styled.div`
  flex-grow: 0;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const OrtePage = () => {
  const { uiStore } = useStores();
  return (
    <Layout growing={1} direction="right">
      <OrteWrapper>
        <Map />
        <OrteKatalog>
          <ListView numCol={2} />
        </OrteKatalog>
      </OrteWrapper>
    </Layout>
  );
};

export default OrtePage;
