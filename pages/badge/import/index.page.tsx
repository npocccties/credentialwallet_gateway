import { GetServerSideProps } from "next";
import React, { useState } from "react";

import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { BadgeList } from "@/components/page/badge/List";
import { VcImport } from "@/components/page/badge/VcImport";
import { SERVICE_DESCRITION, SERVICE_NAME } from "@/configs";
import { pagePath } from "@/constants";
import { errors } from "@/constants/error";
import { logEndForPageSSR, logStartForPageSSR, logStatus } from "@/constants/log";
import { loggerError, loggerInfo } from "@/lib/logger";
import { LmsList } from "@/lib/prisma";
import { findAllLmsList } from "@/server/repository/lmsList";

type Props = {
  lmsList: LmsList[];
};

const page = pagePath.badge.import;

export const getServerSideProps: GetServerSideProps = async () => {
  loggerInfo(logStartForPageSSR(page));
  try {
    const lmsList = await findAllLmsList();

    loggerInfo(`${logStatus.success} ${page}`);
    loggerInfo(logEndForPageSSR(page));

    return { props: { lmsList } };
  } catch (e) {
    loggerError(`${logStatus.error} ${page}`, e.message);
    throw new Error(errors.response500.message);
  }
};

const ImportVCPage = (props: Props) => {
  const [isBadgeSelect, setIsBadgeSelect] = useState(false);
  const pageWidth = isBadgeSelect ? "md" : "2xl";
  return (
    <Layout align="center" textAlign="center" maxW={pageWidth}>
      <Metatag title={SERVICE_NAME} description={SERVICE_DESCRITION} />
      {isBadgeSelect ? (
        <VcImport setIsBadgeSelect={setIsBadgeSelect} />
      ) : (
        <BadgeList lmsList={props.lmsList} setIsBadgeSelect={setIsBadgeSelect} />
      )}
    </Layout>
  );
};

export default ImportVCPage;
