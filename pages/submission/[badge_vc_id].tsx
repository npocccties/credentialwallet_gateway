import { GetServerSidePropsResult } from "next";
import React from "react";
import { z } from "zod";

import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { SubmissionBadge } from "@/components/page/submission/SubmissionBadge";
import { errors } from "@/constants/error";
import prisma from "@/lib/prisma";
import { SubmissionEntry } from "@/types/api/submission";

const querySchema = z.object({
  badge_vc_id: z
    .string()
    .refine((v) => {
      return !isNaN(Number(v));
    })
    .transform((v) => Number(v)),
});

export async function getServerSideProps(context): Promise<GetServerSidePropsResult<SubmissionEntry>> {
  const result = querySchema.safeParse(context.params);

  if (!result.success) {
    return { notFound: true };
  }
  const id = result.data.badge_vc_id;

  try {
    const [badgeVc, badgeConsumers] = await Promise.all([
      prisma.badgeVc.findUnique({
        select: {
          badgeVcId: true,
          vcDataPayload: true,
        },
        where: {
          badgeVcId: id,
        },
      }),
      prisma.badgeConsumer.findMany(),
    ]);

    if (!badgeVc) {
      return { notFound: true };
    }

    const { vcDataPayload, badgeVcId } = badgeVc;
    const vcPayload = vcDataPayload && JSON.parse(vcDataPayload);
    const vcImage = vcPayload.vc.credentialSubject.photo;

    return { props: { badgeConsumers, vcImage, badgeVcId } };
  } catch {
    throw new Error(errors.response500.message);
  }
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
