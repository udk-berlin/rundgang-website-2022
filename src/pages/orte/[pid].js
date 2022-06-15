import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useStores } from "@/stores/index";
import Layout from "@/components/simple/Layout";
import ListView from "@/components/ListView";
import ItemView from "@/components/ItemView";

const OrteViewWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  flex-grow: 1;
`;

const OrteView = () => {
  const router = useRouter();
  const { dataStore, uiStore } = useStores();
  const { pid } = router.query;

  return dataStore.api.currentRoot ? (
    <Layout>
      <OrteViewWrapper>
        {dataStore.api.currentRoot.type == "item" && <ItemView />}
        {uiStore.items?.length && <ListView />}
      </OrteViewWrapper>
    </Layout>
  ) : null;
};

export default observer(OrteView);
