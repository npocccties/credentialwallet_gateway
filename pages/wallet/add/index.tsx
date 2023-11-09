import dynamic from "next/dynamic";
import React from "react";

import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { SERVICE_DESCRITION, SERVICE_NAME } from "@/configs";

const AddWallet = dynamic(() => import("@/components/page/wallet/Add").then((mod) => mod.AddWallet), { ssr: false });

const index = () => {
  return (
    <Layout maxW="xl" showHeaderContents={false}>
      <Metatag title={SERVICE_NAME} description={SERVICE_DESCRITION} />
      <AddWallet />
    </Layout>
  );
};

export default index;
