import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useStores } from "@/stores/index";
import Layout from "@/components/simple/Layout";
import ListView from "@/components/ListView";
import ItemView from "@/components/ItemView";

const KatalogViewWrapper = styled.div`
  width: 100%;
`;

const KatalogView = () => {
  const { uiStore } = useStores();

  return uiStore.currentContext ? (
    <Layout direction="left">
      <KatalogViewWrapper>
        {uiStore.currentContext.type == "item" ? <ItemView /> : <ListView />}
      </KatalogViewWrapper>
    </Layout>
  ) : null;
};

export default observer(KatalogView);
