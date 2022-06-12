import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import Layout from "@/components/simple/Layout";
import ItemView from "@/components/ItemView";

const EventViewWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  flex-grow: 1;
`;

const EventView = () => {
  const { dataStore } = useStores();

  return dataStore.api.currentRoot ? (
    <Layout growing={1} direction="right">
      <EventViewWrapper>
        {dataStore.api.currentRoot.type == "item" && <ItemView />}
      </EventViewWrapper>
    </Layout>
  ) : null;
};

export default observer(EventView);
