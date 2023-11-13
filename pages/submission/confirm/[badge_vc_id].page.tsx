import dynamic from "next/dynamic";

import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";

const Confirm = dynamic(() => import("@/components/page/submission/Confirm").then((mod) => mod.Confirm), {
  ssr: false,
});

const SubmittionConfirmPage = () => {
  return (
    <Layout align="center" textAlign="center" maxW="sm">
      <Metatag title="submission badge" description="バッジ提出" />
      <Confirm />
    </Layout>
  );
};

export default SubmittionConfirmPage;
