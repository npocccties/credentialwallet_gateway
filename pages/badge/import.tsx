import { GetServerSideProps } from "next";
import React, { useState } from "react";

import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { BadgeList } from "@/components/page/badge/List";
import { VcImport } from "@/components/page/badge/VcImport";
import { errors } from "@/constants/error";
import { logEndForPageSSR, logStartForPageSSR, logStatus } from "@/constants/log";
import { loggerError, loggerInfo } from "@/lib/logger";
import prisma, { LmsList } from "@/lib/prisma";

type Props = {
  lmsList: LmsList[];
};

const pagePath = "/badge/import";

export const getServerSideProps: GetServerSideProps = async () => {
  loggerInfo(logStartForPageSSR(pagePath));
  try {
    const lmsList = await prisma.lmsList.findMany({
      orderBy: {
        lmsId: "asc",
      },
    });

    loggerInfo(`${logStatus.success} ${pagePath}`);
    loggerInfo(logEndForPageSSR(pagePath));

    return { props: { lmsList } };
  } catch (e) {
    loggerError(`${logStatus.error} ${pagePath}`, e.message);
    throw new Error(errors.response500.message);
  }
};

const ImportVCPage = (props: Props) => {
  const [isBadgeSelect, setIsBadgeSelect] = useState(false);
  const pageWidth = isBadgeSelect ? "md" : "2xl";
  return (
    <Layout align="center" textAlign="center" maxW={pageWidth}>
      <Metatag title="Get Open Badge from Moodle" description="Moodle" />
      {isBadgeSelect ? (
        <VcImport setIsBadgeSelect={setIsBadgeSelect} />
      ) : (
        <BadgeList lmsList={props.lmsList} setIsBadgeSelect={setIsBadgeSelect} />
      )}
    </Layout>
  );
};

export default ImportVCPage;
