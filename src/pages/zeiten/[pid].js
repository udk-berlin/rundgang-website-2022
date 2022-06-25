import React from "react";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import Layout from "@/components/simple/Layout";
import ItemView from "@/components/ItemView";

const ZeitenView = () => {
  const { uiStore } = useStores();

  return uiStore.currentContext ? (
    <Layout>{uiStore.currentContext.type == "item" && <ItemView />}</Layout>
  ) : null;
};

export default observer(ZeitenView);
