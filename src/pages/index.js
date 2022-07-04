import React from "react";
import Layout from "@/components/simple/Layout";
import LandingPage from "@/components/LandingPage";

const IndexPage = () => {
  return (
    <Layout showToTop={false}>
      <LandingPage />
    </Layout>
  );
};

export default IndexPage;
