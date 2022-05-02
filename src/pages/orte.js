import React from "react";
import Layout from "@/components/Layout";
import { Container } from "@/theme/reusedStyles";
import Map from "@/components/Map";

const OrtePage = () => {
  return (
    <Layout>
      <Container>
        ORTE
        <Map />
      </Container>
    </Layout>
  );
};

export default OrtePage;
