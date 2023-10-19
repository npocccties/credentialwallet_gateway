import { GetServerSidePropsResult } from "next";
import React from "react";

import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { VcImport } from "@/components/page/badge/VcImport";
import { myOpenBadge } from "@/lib/moodle";
import { BadgeMetaData } from "@/types/badgeInfo/metaData";

type Props = {
  badgeMetaData: BadgeMetaData;
  badgeEmail: string;
};

export async function getServerSideProps(context): Promise<GetServerSidePropsResult<Props>> {
  const { uniquehash, email } = context.query;
  console.log("import", uniquehash, email);

  const badgeMetaData = await myOpenBadge(uniquehash);

  return { props: { badgeMetaData, badgeEmail: email } };
}
const VcImportPage = (props: Props) => {
  const { badgeMetaData, badgeEmail } = props;
  console.log("badgeData", badgeMetaData);
  return (
    <Layout align="center" textAlign="center" maxW="md">
      <Metatag title="Get Open Badge from Moodle" description="Moodle" />
      <VcImport badgeMetaData={badgeMetaData} badgeEmail={badgeEmail} />
    </Layout>
  );
};

export default VcImportPage;
