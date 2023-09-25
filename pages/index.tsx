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
  dataCount: number;
  totalPages: number;
  currentPage: number;
};

const Home: NextPage<Props> = (props) => {
  console.log(props);
  return (
    <Layout maxW="xl">
      <Metatag title={SERVICE_NAME} description={SERVICE_DESCRITION} />
      <MyWaletVCList
        data={props.data}
        dataCount={props.dataCount}
        currentPageProps={props.currentPage}
        totalPagesProps={props.totalPages}
      />
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetch(`${process.env.baseURL}/api/v1/getVcList`);
  const props = data.json();
  console.log("data", data);

  return { props: props };
};
