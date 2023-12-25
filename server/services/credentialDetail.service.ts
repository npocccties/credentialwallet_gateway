import { BadgeVc } from "@prisma/client";
import axios from "axios";

import { getWalletId } from "./wallet.service";
import { credentialDetail } from "../repository/credentialDetail";

import { logStatus } from "@/constants/log";
import { convertUTCtoJSTstr } from "@/lib/date";
import { loggerError } from "@/lib/logger";
import { BadgeVcSubmission } from "@/types/api/credential";
import { KnowledgeBadges, VcDetailData } from "@/types/api/credential/detail";
import { Alignment, KnowledgeBadgeInfo, WisdomBadgeInfo } from "@/types/BadgeInfo";

export const getCredentialDetail = async ({ badgeVcId, eppn }: { badgeVcId: number; eppn: string }) => {
  const walletId = await getWalletId(eppn);

  const { badgeVc, submissions } = await credentialDetail({ walletId, badgeVcId });

  return { badgeVc, submissions };
};

export const getBadgeMetaData = async (badgeVc: BadgeVc) => {
  const url = badgeVc.badgeClassId;
  const badgeMetaData: WisdomBadgeInfo = await axios.get(url).then((res) => res.data);
  if (!badgeMetaData) {
    loggerError(`${logStatus.error} wisdom badge not found!`, badgeVc.badgeClassId);
    throw new Error("wisdom badge not found");
  }

  return badgeMetaData;
};

export const getKnowledgeBadges = async (badgeMetaData: WisdomBadgeInfo) => {
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
    loggerError(`${logStatus.error} knowledge badge not found!`, alignments);
    throw new Error("knowledge badge not found");
  }

  knowledgeBadgeInfo.map((item) => {
    knowledgeBadges.push({ badgeName: item.name, badgeImageUrl: item.image.id });
  });

  return { courseInfo, knowledgeBadges };
};

export const createVcDetailData = (
  badgeVc: BadgeVc,
  submissionsHistories: BadgeVcSubmission[],
  courseInfo: Alignment[],
) => {
  const vcDetailData: VcDetailData = {
    badgeVcId: badgeVc.badgeVcId,
    badgeName: badgeVc.badgeName,
    badgeEarnerEmail: badgeVc.badgeEarnerEmail,
    badgeIssuerName: badgeVc.badgeIssuerName,
    badgeIssuedon: convertUTCtoJSTstr(badgeVc.badgeIssuedon),
    badgeExpires: convertUTCtoJSTstr(badgeVc.badgeExpires),
    lmsName: badgeVc.lmsName,
    vcDataPayload: badgeVc.vcDataPayload,
    courseUrl: courseInfo[0].targetUrl,
    submissions: submissionsHistories,
  };

  return vcDetailData;
};
