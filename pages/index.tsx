import React from "react";

import type { NextPage } from "next";

import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { WaletVCList } from "@/components/page/wallet/List";
import { SERVICE_NAME, SERVICE_DESCRITION } from "@/configs";

const Home: NextPage = () => {
  return (
    <Layout maxW="xl">
      <Metatag title={SERVICE_NAME} description={SERVICE_DESCRITION} />
      <WaletVCList />
    </Layout>
  );
};

export default Home;
