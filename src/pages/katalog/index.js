import React from "react";
import styled from "styled-components";
import { useStores } from "@/stores/index";
import Layout from "@/components/simple/Layout";
import ListView from "@/components/ListView";

const KatalogPage = () => {
  return (
    <Layout direction="left">
      <ListView />
    </Layout>
  );
};

export default KatalogPage;
