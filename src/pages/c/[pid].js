import React from "react";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import Layout from "@/components/simple/Layout";
import ListView from "@/components/ListView";
import ItemView from "@/components/ItemView";

const KatalogView = () => {
  const { uiStore } = useStores();

  return uiStore.currentContext ? (
    <Layout direction="left">
      {uiStore.currentContext.type == "item" ? <ItemView /> : <ListView />}
    </Layout>
  ) : null;
};

export default observer(KatalogView);
