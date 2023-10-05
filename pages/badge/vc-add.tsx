import React from "react";

import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { VcAdd } from "@/components/page/badge/VcAdd";

const VcAddPage = () => {
  return (
    <Layout align="center" textAlign="center" maxW="md">
      <Metatag title="Get Open Badge from Moodle" description="Moodle" />
      <VcAdd />
    </Layout>
  );
};

export default VcAddPage;
