import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import Layout from "@/components/simple/Layout";
import ListView from "@/components/ListView";
import ItemView from "@/components/ItemView";
import Floorplan from "@/components/Floorplan";

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
  padding: ${({ theme }) => theme.spacing.lg};
  width: 40%;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    width: 100%;
  }
`;

const FloorplanContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  @media ${({ theme }) => theme.breakpoints.laptop} {
    position: sticky;
    top: 18vh;
  }
`;

const OrteView = () => {
  const { dataStore } = useStores();

  return dataStore.api.currentRoot ? (
    <Layout>
      <OrteViewWrapper>
        {dataStore.api.currentRoot.type == "item" ? (
          <ItemView />
        ) : (
          dataStore.api.currentRoot.template == "location-building" && (
            <FloorplanContainer>
              <Floorplan />
            </FloorplanContainer>
          )
        )}
        <OrteKatalog>
          <ListView numCol={2} />
        </OrteKatalog>
      </OrteViewWrapper>
    </Layout>
  ) : null;
};

export default observer(OrteView);
