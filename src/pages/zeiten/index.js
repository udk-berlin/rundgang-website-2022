import React from "react";
import Layout from "@/components/simple/Layout";
import TimeTable from "@/components/TimeTable";
import JumpToTop from "@/components/JumpToTop";

const ZeitenPage = () => {
  return (
    <Layout growing={0} direction="right">
      <TimeTable />
      <JumpToTop />
    </Layout>
  );
};

export default ZeitenPage;
