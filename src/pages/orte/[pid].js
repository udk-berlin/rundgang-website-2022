import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import Layout from "@/components/simple/Layout";
import ListView from "@/components/ListView";
import ItemView from "@/components/ItemView";
import Floorplan from "@/components/Floorplan";
import {
  SEARCHBAR_HEIGHT,
  SEARCHBAR_PADDING,
  TITLE_HEIGHT,
} from "@/utils/constants";

const OrteViewWrapper = styled.div`
  width: 100%;
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

const FloorplanContainer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.space(16)} 0px;
  height: 100%;
  position: relative;
  @media ${({ theme }) => theme.breakpoints.laptop} {
    width: 60%;
    position: sticky;
    top: ${SEARCHBAR_HEIGHT + SEARCHBAR_PADDING + TITLE_HEIGHT}px;
  }
`;

const OrteView = () => {
  const { uiStore } = useStores();

  return uiStore.currentContext ? (
    <Layout>
      <OrteViewWrapper>
        {uiStore.currentContext.type == "item" ? (
          <ItemView />
        ) : (
          uiStore.currentContext.template == "location-building" && (
            <FloorplanContainer>
              <Floorplan />
            </FloorplanContainer>
          )
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
