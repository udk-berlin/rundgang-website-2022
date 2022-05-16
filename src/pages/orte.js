import React from "react";
import Layout from "@/components/Layout";
import Map from "@/components/Map";

const OrtePage = () => {
  return (
    <Layout growing={1}>
      <>
        ORTE
        <Map />
      </>
    </Layout>
  );
};

export default OrtePage;
