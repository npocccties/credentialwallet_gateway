import React from "react";
import type { GetServerSideProps, NextPage } from "next";

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
  totalPages: number;
  currentPage: number;
};

const Home: NextPage<Props> = (props) => {
  return (
    <Layout maxW="xl">
      <Metatag title={SERVICE_NAME} description={SERVICE_DESCRITION} />
      <MyWaletVCList data={props.data} currentPageProps={props.currentPage} totalPagesProps={props.totalPages} />
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetch("http://localhost:3000/api/temp/badgeVcList");
  const props = data.json();
  console.log("data", data);

  return { props: props };
};
