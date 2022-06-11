import React from "react";
import Layout from "@/components/simple/Layout";
import TimeTable from "@/components/TimeTable";

const ZeitenPage = () => {
  return (
    <Layout growing={1} direction="right">
      <TimeTable />
    </Layout>
  );
};

export default ZeitenPage;
