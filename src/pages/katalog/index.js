import React from "react";
import styled from "styled-components";
import { useStores } from "@/stores/index";
import Layout from "@/components/simple/Layout";
import ListView from "@/components/ListView";

const KatalogPage = () => {
  const { uiStore } = useStores();
  return (
    <Layout growing={1} direction="left">
      {uiStore.items?.length && <ListView />}
    </Layout>
  );
};

export default KatalogPage;
