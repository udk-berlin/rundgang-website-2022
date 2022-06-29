import React from "react";
import styled from "styled-components";
import Layout from "@/components/simple/Layout";
import Map from "@/components/Map";
import ListView from "@/components/ListView";
import {
  SEARCHBAR_HEIGHT,
  SEARCHBAR_PADDING,
  TITLE_HEIGHT,
} from "@/utils/constants";

const OrteWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    flex-wrap: wrap;
  }
`;

const OrteKatalog = styled.div`
  flex-grow: 0;
  width: 40%;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    width: 100%;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.space(16)} 0px;
  height: 100%;
  position: relative;
  @media ${({ theme }) => theme.breakpoints.laptop} {
    position: sticky;
    top: ${SEARCHBAR_HEIGHT + SEARCHBAR_PADDING + TITLE_HEIGHT}px;
  }
`;

const OrtePage = () => {
  return (
    <Layout>
      <OrteWrapper>
        <MapContainer>
          <Map />
        </MapContainer>
        <OrteKatalog className="sticky-element">
          <ListView numCol={2} />
        </OrteKatalog>
      </OrteWrapper>
    </Layout>
  );
};

export default OrtePage;
