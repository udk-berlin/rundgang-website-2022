import React from "react";
import Layout from "@/components/simple/Layout";
import Map from "@/components/Map";

const OrtePage = () => {
  return (
    <Layout growing={1} direction="right">
      <>
        <Map />
      </>
    </Layout>
  );
};

export default OrtePage;
