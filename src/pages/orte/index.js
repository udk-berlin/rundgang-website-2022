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
  display: grid;
  position: relative;
  margin: auto;
  gap: 16px 16px;
  grid-template-columns: 6fr 4fr;
  align-items: start;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    grid-template-columns: 1fr;
  }
`;

const OrteKatalog = styled.div`
  flex-grow: 0;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    width: 100%;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.space(16)} 0px;
  position: relative;
  @media ${({ theme }) => theme.breakpoints.laptop} {
    position: sticky;
    align-self: start;
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
