import React from "react";

import type { NextPage } from "next";

import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { MyWaletVCList } from "@/components/page/mywallet/List";
import { SERVICE_NAME, SERVICE_DESCRITION } from "@/configs";
import { badgeListActions } from "@/share/store/badgeList/main";

const Home: NextPage = () => {
  return (
    <Layout maxW="xl">
      <Metatag title={SERVICE_NAME} description={SERVICE_DESCRITION} />
      <MyWaletVCList />
    </Layout>
  );
};

export default Home;
