import { GetServerSidePropsResult } from "next";
import { ErrorProps } from "next/error";
import React, { useEffect } from "react";
import { z } from "zod";

import { Layout } from "@/components/Layout";
import { CredentialDetail } from "@/components/page/detail/CredentialDetail";
import { errors } from "@/constants/error";
import { logEndForPageSSR, logStartForPageSSR, logStatus } from "@/constants/log";
import { convertUTCtoJSTstr } from "@/lib/date";
import { loggerError, loggerInfo } from "@/lib/logger";
import { getUserInfoFormJwt } from "@/lib/login";
import {
  createVcDetailData,
  getBadgeMetaData,
  getCredentialDetail,
  getKnowledgeBadges,
} from "@/server/services/credentialDetail.service";
import { vcDetailActions } from "@/share/store/credentialDetail/main";
import { BadgeVcSubmission } from "@/types/api/credential";
import { CredentialDetailData, VcDetailData } from "@/types/api/credential/detail";
import { WisdomBadgeInfo } from "@/types/BadgeInfo";

export type Context = {
  params: { badge_vc_id: string };
};

const querySchema = z.object({
  badge_vc_id: z
    .string()
    .refine((v) => {
      return !isNaN(Number(v));
    })
    .transform((v) => Number(v)),
});

const pagePath = "/wallet/detail/[badge_vc_id]";

export const getServerSideProps = async function (
  context,
): Promise<GetServerSidePropsResult<ErrorProps | CredentialDetailData>> {
  loggerInfo(logStartForPageSSR(pagePath));

  const result = querySchema.safeParse(context.params);

  if (!result.success) {
    loggerError(`${logStatus.error} bad request!`, context.params);

    return { notFound: true };
  }
  const id = result.data.badge_vc_id;
  // const eppn = context.req.session.eppn;
  const jwt = context.req.cookies.jwt;
  const { eppn } = getUserInfoFormJwt(jwt);

  try {
    const { badgeVc, submissions } = await getCredentialDetail({ badgeVcId: id, eppn });

    if (!badgeVc) {
      loggerError(`${logStatus.error} badgeVc not found!`, context.params);
      return { notFound: true };
    }

    const badgeMetaData: WisdomBadgeInfo = await getBadgeMetaData(badgeVc);

    const sub = submissions.map((sub): BadgeVcSubmission => {
      return {
        consumerName: sub.consumerName,
        submitedAt: convertUTCtoJSTstr(sub.submitedAt),
      };
    });

    const { courseInfo, knowledgeBadges } = await getKnowledgeBadges(badgeMetaData);

    const submissionsHistories = sub;
    const vcPayload = JSON.parse(badgeVc.vcDataPayload);
    const badgeExportData = vcPayload.vc.credentialSubject.photo;

    const vcDetailData: VcDetailData = createVcDetailData(badgeVc, sub, courseInfo);

    loggerInfo(`${logStatus.success} ${pagePath}`);
    loggerInfo(logEndForPageSSR(pagePath));

    return { props: { vcDetailData, knowledgeBadges, submissionsHistories, badgeExportData } };
  } catch (e) {
    loggerError(`${logStatus.error} ${pagePath}`, e.message);
    throw new Error(errors.response500.message);
  }
};

const CredentialDetailPage = (props: CredentialDetailData) => {
  const { vcDetailData, knowledgeBadges, submissionsHistories, badgeExportData } = props;

  const { setVcDetail } = vcDetailActions.useSetVcDetail();
  useEffect(() => {
    setVcDetail(vcDetailData);
  }, []);

  return (
    <Layout maxW="xl">
      <CredentialDetail
        vcDetailData={vcDetailData}
        knowledgeBadges={knowledgeBadges}
        submissionsHistories={submissionsHistories}
        badgeExportData={badgeExportData}
      />
    </Layout>
  );
};

export default CredentialDetailPage;
