import axios from "axios";
import { withIronSessionSsr } from "iron-session/next";
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
import prisma from "@/lib/prisma";
import { sessionOptions } from "@/lib/session";
import { getWalletId } from "@/server/services/wallet.service";
import { vcDetailActions } from "@/share/store/credentialDetail/main";
import { BadgeVcSubmission } from "@/types/api/credential";
import { CredentialDetailData, KnowledgeBadges, VcDetailData } from "@/types/api/credential/detail";
import { Alignment, KnowledgeBadgeInfo, WisdomBadgeInfo } from "@/types/BadgeInfo";

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

export const getServerSideProps = withIronSessionSsr(async function (
  context,
): Promise<GetServerSidePropsResult<ErrorProps | CredentialDetailData>> {
  loggerInfo(logStartForPageSSR(pagePath));

  const result = querySchema.safeParse(context.params);

  if (!result.success) {
    loggerError(`${logStatus.error} bad request!`, context.params);

    return { notFound: true };
  }
  const id = result.data.badge_vc_id;
  const eppn = context.req.session.eppn;

  try {
    const walletId = await getWalletId(eppn);
    const [badgeVc, submissions] = await Promise.all([
      prisma.badgeVc.findUnique({
        where: {
          badgeVcId: id,
          walletId: walletId,
        },
      }),
      prisma.submission.findMany({
        where: {
          badgeVcId: id,
          walletId: walletId,
        },
      }),
    ]);

    if (!badgeVc) {
      loggerError(`${logStatus.error} badgeVc not found!`, context.params);
      return { notFound: true };
    }

    const url = badgeVc.badgeClassId;
    const badgeMetaData: WisdomBadgeInfo = await axios.get(url).then((res) => res.data);
    if (!badgeMetaData) {
      loggerError(`${logStatus.error} wisdom badge not found!`, context.params);
      throw new Error("wisdom badge not found");
    }

    const sub = submissions.map((sub): BadgeVcSubmission => {
      return {
        consumerName: sub.consumerName,
        submitedAt: convertUTCtoJSTstr(sub.submitedAt),
      };
    });

    const knowledgeBadges: KnowledgeBadges = [];
    const alignments: Alignment[] = [];
    const courseInfo = badgeMetaData.alignments.map((item) => {
      if (item.targetUrl.includes("/course")) {
        return item;
      }

      alignments.push(item);
    });

    const knowledgeBadgeInfo: KnowledgeBadgeInfo[] = await Promise.all(
      alignments.map((alignment) => {
        const data = axios.get(alignment.targetUrl).then((res) => res.data);
        return data;
      }),
    ).then((result) => result);
    if (!knowledgeBadgeInfo) {
      loggerError(`${logStatus.error} knowledge badge not found!`, context.params);
      throw new Error("knowledge badge not found");
    }

    knowledgeBadgeInfo.map((item) => {
      knowledgeBadges.push({ badgeName: item.name, badgeImageUrl: item.image.id });
    });

    const submissionsHistories = sub;
    const vcPayload = JSON.parse(badgeVc.vcDataPayload);
    const badgeExportData = vcPayload.vc.credentialSubject.photo;

    const vcDetailData: VcDetailData = {
      badgeVcId: badgeVc.badgeVcId,
      badgeName: badgeVc.badgeName,
      badgeEarnerEmail: badgeVc.badgeEarnerEmail,
      badgeIssuerName: badgeVc.badgeIssuerName,
      badgeIssuedon: convertUTCtoJSTstr(badgeVc.badgeIssuedon),
      badgeExpires: convertUTCtoJSTstr(badgeVc.badgeExpires),
      vcDataPayload: badgeVc.vcDataPayload,
      courseUrl: courseInfo[0].targetUrl,
      submissions: sub,
    };

    loggerInfo(`${logStatus.success} ${pagePath}`);
    loggerInfo(logEndForPageSSR(pagePath));

    return { props: { vcDetailData, knowledgeBadges, submissionsHistories, badgeExportData } };
  } catch (e) {
    loggerError(`${logStatus.error} ${pagePath}`, e.message);
    throw new Error(errors.response500.message);
  }
}, sessionOptions);

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
