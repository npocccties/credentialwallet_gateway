import { GetServerSideProps } from "next";
import React, { useState } from "react";

import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { BadgeList } from "@/components/page/badge/List";
import { VcImport } from "@/components/page/badge/VcImport";
import prisma, { LmsList } from "@/lib/prisma";

type Props = {
  issuerList: LmsList[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const issuerList = await prisma.lmsList.findMany();
  return { props: { issuerList } };
};

const ImportVCPage = (props: Props) => {
  const [isBadgeSelect, setIsBadgeSelect] = useState(false);
  return (
    <Layout align="center" textAlign="center" maxW="2xl">
      <Metatag title="Get Open Badge from Moodle" description="Moodle" />
      {isBadgeSelect ? <VcImport /> : <BadgeList lmsList={props.issuerList} setIsBadgeSelect={setIsBadgeSelect} />}
    </Layout>
  );
};

export default ImportVCPage;
