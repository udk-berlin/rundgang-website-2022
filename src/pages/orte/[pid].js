import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import Layout from "@/components/simple/Layout";
import ListView from "@/components/ListView";
import ItemView from "@/components/ItemView";
import Floorplan from "@/components/Floorplan";
import Map from "@/components/Map";
import {
  SEARCHBAR_HEIGHT,
  SEARCHBAR_PADDING,
  TITLE_HEIGHT,
} from "@/utils/constants";

const OrteViewWrapper = styled.div`
  width: 100%;
  display: grid;
  gap: 16px 16px;
  grid-template-columns: ${({ fullwidth }) => (fullwidth ? "1fr" : " 6fr 4fr")};
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

const FloorplanContainer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.space(16)} 0px;
  position: relative;
  @media ${({ theme }) => theme.breakpoints.laptop} {
    position: sticky;
    align-self: start;
    top: ${SEARCHBAR_HEIGHT + SEARCHBAR_PADDING + TITLE_HEIGHT}px;
  }
`;

const OrteView = () => {
  const { uiStore } = useStores();

  return uiStore.currentContext ? (
    <Layout>
      <OrteViewWrapper fullwidth={uiStore.currentContext.type == "item"}>
        {uiStore.currentContext.type == "item" ? (
          <ItemView />
        ) : (
          <FloorplanContainer>
            {["location-building", "location-level", "location-room"].includes(
              uiStore.currentContext.template,
            ) ? (
              <Floorplan />
            ) : (
              <Map />
            )}
          </FloorplanContainer>
        )}
        {uiStore.currentContext.type !== "item" ? (
          <OrteKatalog>
            <ListView numCol={2} />
          </OrteKatalog>
        ) : null}
      </OrteViewWrapper>
    </Layout>
  ) : null;
};

export default observer(OrteView);
