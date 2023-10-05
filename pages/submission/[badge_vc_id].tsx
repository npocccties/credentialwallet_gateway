import React from "react";

import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { SubmissionBadge } from "@/components/page/submission/SubmissionBadge";

const SubmissionEnterPage = () => {
  return (
    <Layout align="center" textAlign="center" maxW="sm">
      <Metatag title="submission badge" description="バッジ提出" />
      <SubmissionBadge />
    </Layout>
  );
};

export default SubmissionEnterPage;
