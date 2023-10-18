import type { NextApiRequest, NextApiResponse } from "next";

import prisma, { BadgeVc, Prisma } from "@/lib/prisma";
import { BadgeVcList, CredentialList, DisplayBadgeVc, SearchFormItem, SubmissionsAll } from "@/types/api/credential";

export default async function handler(req: NextApiRequest, res: NextApiResponse<CredentialList | {}>) {
  // const perPage = 10;
  // const skip = perPage * (req.body.page - 1);
  const searchQueryparam = req.query as { [key: string]: string };
  const { badgeName, issuedFrom, issuedTo, sortOrder } = searchQueryparam;

  // TODO: ログイン判定処理

  // TODO: SAMLのOrthorsIDをもとに、MyWalletIdを取得しセットする
  const walletId = 1;
  const sertchState: SearchFormItem = {
    badgeName: badgeName,
    issuedFrom: issuedFrom === "" ? undefined : issuedFrom,
    issuedTo: issuedTo === "" ? undefined : issuedTo,
    sortOrder: sortOrder,
  };

  const [badgeVcs, submissions, consumers, submissionCount, badgeCount] = await Promise.all([
    prisma.badgeVc.findMany({
      where: {
        walletId: walletId,
        badgeName: {
          contains: sertchState.badgeName,
        },
        badgeIssuedon: {
          gte: sertchState.issuedFrom && new Date(sertchState.issuedFrom),
          lt: sertchState.issuedTo && new Date(sertchState.issuedTo),
        },
      },
      orderBy: {
        badgeIssuedon: sertchState.sortOrder === "ask" ? Prisma.SortOrder.asc : Prisma.SortOrder.desc,
      },
    }),
    prisma.submission.findMany({
      where: {
        walletId: walletId,
      },
    }),
    prisma.badgeConsumer.findMany(),
    prisma.submission.count({
      where: {
        walletId: walletId,
      },
    }),
    prisma.badgeVc.count({
      where: {
        walletId: walletId,
      },
    }),
  ]);

  const badgeVcList: BadgeVcList = badgeVcs.map((badgeVc: BadgeVc): DisplayBadgeVc => {
    const vc: DisplayBadgeVc = {
      badgeVcId: badgeVc.badgeVcId,
      badgeName: badgeVc.badgeName,
      badgeIssuerName: badgeVc.badgeIssuerName,
      badgeIssuedon: badgeVc.badgeIssuedon.toString(),
      vcDataPayload: badgeVc.vcDataPayload,
      submissions: [],
    };

    const submission = submissions.filter((s) => s.badgeVcId === badgeVc.badgeVcId);
    submission.forEach((sub) => {
      vc.submissions.push({
        consumerName: sub.consumerName,
        submitedAt: sub.submitedAt.toString(),
      });
    });

    return vc;
  });

  const submissionsAll: SubmissionsAll = {
    totalSubmission: submissionCount,
    detailSubmissions: [],
  };

  const submitList = submissions.filter((x) => x.walletId === walletId);
  consumers.forEach((consumer) => {
    if (!submitList.some((x) => x.consumerId === consumer.consumerId)) return;

    submissionsAll.detailSubmissions.push({
      cabinetToSubmit: consumer.consumerName,
      submitCount: submissions.filter((item) => item.consumerId === consumer.consumerId).length,
    });
  });

  const data: CredentialList = {
    badgeVcList: badgeVcList,
    submissionsAll: submissionsAll,
    totalBadgeCount: badgeCount,
  };

  res.status(200).json({ data });
}
