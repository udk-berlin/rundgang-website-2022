import React from "react";
import Layout from "@/components/simple/Layout";
import dynamic from "next/dynamic";
const LandingPage = dynamic(() => import("../components/LandingPage"), {
  loading: () => <div></div>,
});

const IndexPage = () => {
  return (
    <Layout showToTop={false}>
      <LandingPage />
    </Layout>
  );
};

export default IndexPage;
