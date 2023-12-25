import dynamic from "next/dynamic";

import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { SERVICE_NAME, SERVICE_DESCRITION } from "@/configs";

const Confirm = dynamic(() => import("@/components/page/submission/Confirm").then((mod) => mod.Confirm), {
  ssr: false,
});

const SubmittionConfirmPage = () => {
  return (
    <Layout align="center" textAlign="center" maxW="sm">
      <Metatag title={SERVICE_NAME} description={SERVICE_DESCRITION} />
      <Confirm />
    </Layout>
  );
};

export default SubmittionConfirmPage;
