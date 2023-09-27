import React from "react";
import type { NextPage } from "next";

import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { SERVICE_NAME, SERVICE_DESCRITION } from "@/configs";
import { MyWaletVCList } from "@/components/page/mywallet/List";

type Props = {
  data: {
    image: string;
    name: string;
    category: string;
    issuer: string;
    issuedate: string;
  }[];
  dataCount: number;
  totalPages: number;
  currentPage: number;
};

const Home: NextPage<Props> = () => {
  return (
    <Layout maxW="xl">
      <Metatag title={SERVICE_NAME} description={SERVICE_DESCRITION} />
      <MyWaletVCList />
    </Layout>
  );
};

export default Home;
