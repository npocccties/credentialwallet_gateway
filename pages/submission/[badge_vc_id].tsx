import { GetServerSidePropsResult } from "next";
import { ErrorProps } from "next/error";
import React from "react";

import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { SubmissionBadge } from "@/components/page/submission/SubmissionBadge";
import prisma from "@/lib/prisma";
import { SubmissionEntry } from "@/types/api/submission";

export async function getServerSideProps(context): Promise<GetServerSidePropsResult<ErrorProps | SubmissionEntry>> {
  const id = context.params.badge_vc_id;

  const [badgeVc, badgeConsumers] = await Promise.all([
    prisma.badgeVc.findUnique({
      select: {
        badgeVcId: true,
        vcDataPayload: true,
      },
      where: {
        badgeVcId: Number(id),
      },
    }),
    prisma.badgeConsumer.findMany(),
  ]);

  const { vcDataPayload, badgeVcId } = badgeVc;
  const vcPayload = vcDataPayload && JSON.parse(vcDataPayload);
  const vcImage = vcPayload.vc.credentialSubject.photo;

  return { props: { badgeConsumers, vcImage, badgeVcId } };
}

const SubmissionEnterPage = (props: SubmissionEntry) => {
  const { badgeConsumers, vcImage, badgeVcId } = props;
  return (
    <Layout align="center" textAlign="center" maxW="md">
      <Metatag title="submission badge" description="バッジ提出" />
      <SubmissionBadge badgeConsumers={badgeConsumers} vcImage={vcImage} badgeVcId={badgeVcId} />
    </Layout>
  );
};

export default SubmissionEnterPage;
