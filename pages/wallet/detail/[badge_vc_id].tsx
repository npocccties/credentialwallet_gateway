import axios from "axios";
import { GetServerSidePropsResult } from "next";
import { ErrorProps } from "next/error";
import React, { useEffect } from "react";
import { z } from "zod";

import { Layout } from "@/components/Layout";
import { CredentialDetail } from "@/components/page/detail/CredentialDetail";
import { errors } from "@/constants/error";
import { convertUTCtoJSTstr } from "@/lib/date";
import prisma from "@/lib/prisma";
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

export async function getServerSideProps(
  context,
): Promise<GetServerSidePropsResult<ErrorProps | CredentialDetailData>> {
  // TODO: ログイン情報を取得し、ウォレットIDを取得
  // const walletId = context.cookies.orthros

  const result = querySchema.safeParse(context.params);

  if (!result.success) {
    return { notFound: true };
  }
  const id = result.data.badge_vc_id;

  try {
    const [badgeVc, submissions] = await Promise.all([
      prisma.badgeVc.findUnique({
        where: {
          badgeVcId: id,
        },
      }),
      prisma.submission.findMany({
        where: {
          badgeVcId: id,
        },
      }),
    ]);

    if (!badgeVc) {
      return { notFound: true };
    }

    const url = badgeVc.badgeClassId;
    const badgeMetaData: WisdomBadgeInfo = await axios.get(url).then((res) => res.data);

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

    return { props: { vcDetailData, knowledgeBadges, submissionsHistories, badgeExportData } };
  } catch (e) {
    throw new Error(errors.response500.message);
  }
}

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
