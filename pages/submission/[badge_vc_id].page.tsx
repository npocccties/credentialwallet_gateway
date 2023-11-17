import { GetServerSidePropsResult } from "next";
import React from "react";
import { z } from "zod";

import { Layout } from "@/components/Layout";
import { Metatag } from "@/components/Metatag";
import { SubmissionBadge } from "@/components/page/submission/SubmissionBadge";
import { errors } from "@/constants/error";
import { logEndForPageSSR, logStartForPageSSR, logStatus } from "@/constants/log";
import { loggerError, loggerInfo } from "@/lib/logger";
import { submissionBadge } from "@/server/repository/submissionBadge";
import { SubmissionEntry } from "@/types/api/submission";

const querySchema = z.object({
  badge_vc_id: z
    .string()
    .refine((v) => {
      return !isNaN(Number(v));
    })
    .transform((v) => Number(v)),
});

const pagePath = "/submission/[badge_vc_id]";

export async function getServerSideProps(context): Promise<GetServerSidePropsResult<SubmissionEntry>> {
  loggerInfo(logStartForPageSSR(pagePath));
  loggerInfo("request query", context.params);

  const result = querySchema.safeParse(context.params);

  if (!result.success) {
    loggerError(`${logStatus.error} bad request! ${pagePath}`);
    return { notFound: true };
  }
  const id = result.data.badge_vc_id;

  try {
    const { badgeVc, badgeConsumers } = await submissionBadge({ badgeVcId: id });

    if (!badgeVc) {
      loggerError(`${logStatus.error} badgeVc not found! ${pagePath}`);
      return { notFound: true };
    }

    const { vcDataPayload, badgeVcId } = badgeVc;
    const vcPayload = vcDataPayload && JSON.parse(vcDataPayload);
    const vcImage = vcPayload.vc.credentialSubject.photo;

    loggerInfo(`${logStatus.success} ${pagePath}`);
    loggerInfo(logEndForPageSSR(pagePath));

    return { props: { badgeConsumers, vcImage, badgeVcId } };
  } catch (e) {
    loggerError(`${logStatus.error} ${pagePath}`, e.message);

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
