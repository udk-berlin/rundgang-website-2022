import React from "react";
import styled from "styled-components";
import Layout from "@/components/simple/Layout";
import Map from "@/components/Map";
import ListView from "@/components/ListView";

const OrteWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const OrteKatalog = styled.div`
  flex-grow: 0;
  padding: ${({ theme }) => theme.spacing.lg};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    width: 100%;
  }
`;

const OrtePage = () => {
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
