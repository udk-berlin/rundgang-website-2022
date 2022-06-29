import React from "react";
import { observer } from "mobx-react";
import { useStores } from "@/stores/index";
import Layout from "@/components/simple/Layout";
import ItemView from "@/components/ItemView";
import TimeTable from "@/components/TimeTable";

const ZeitenView = () => {
  const { uiStore } = useStores();

  return uiStore.currentContext ? (
    <Layout>
      {uiStore.currentContext.type == "item" && <ItemView />}
      {uiStore.currentContext.type == "context" && <TimeTable />}
    </Layout>
  ) : null;
};

export default observer(ZeitenView);
