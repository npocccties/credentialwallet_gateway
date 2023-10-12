import React from "react";

import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { BadgeList } from "@/components/page/badge/List";
import { GetServerSideProps } from "next";
import prisma, { badgeIssuerSelector } from "@/lib/prisma";

type Props = {
  issuerList: badgeIssuerSelector[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const issuerList = await prisma.badgeIssuerSelector.findMany();
  return { props: { issuerList } };
};

const CreateVCPage = (props: Props) => {
  return (
    <Layout align="center" textAlign="center" maxW="2xl">
      <Metatag title="Get Open Badge from Moodle" description="Moodle" />
      <BadgeList issuerList={props.issuerList} />
    </Layout>
  );
};

export default CreateVCPage;
