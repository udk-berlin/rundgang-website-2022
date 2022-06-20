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
  height: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  flex-grow: 1;
`;

const KatalogView = () => {
  const router = useRouter();
  const { uiStore } = useStores();
  const { pid } = router.query;

  return uiStore.currentContext ? (
    <Layout
      direction="right"
      isEvent={uiStore.currentContext.template === "event"}
    >
      <KatalogViewWrapper>
        {pid == "beratungsangebote" ? "beratungsangebote" : null}
        {uiStore.currentContext.type == "item" && <ItemView />}
        <ListView />
      </KatalogViewWrapper>
    </Layout>
  ) : null;
};

export default observer(KatalogView);
