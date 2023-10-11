import type { NextApiRequest, NextApiResponse } from "next";

import prisma, { BadgeVc } from "@/lib/prisma";
import { BadgeVcList, CredentialList, DisplayBadgeVc, SearchFormItem, SubmissionsAll } from "@/types/api/credential";

export default async function handler(req: NextApiRequest, res: NextApiResponse<CredentialList | {}>) {
  // const perPage = 10;
  // const skip = perPage * (req.body.page - 1);

  // TODO: ログイン判定処理

  // TODO: SAMLのOrthorsIDをもとに、MyWalletIdを取得しセットする
  const mywalletId = 1;
  const sertchState: SearchFormItem = {
    badgeName: undefined,
    issuedFrom: undefined,
    issuedTo: undefined,
    sortOrder: "desk",
  };

  const [badgeVcs, submissions, customers, submissionCount, badgeCount] = await Promise.all([
    prisma.badgeVc.findMany({
      where: {
        mywalletId: mywalletId,
        badgeName: sertchState.badgeName,
        badgeIssuedon: {
          gte: sertchState.issuedFrom && new Date(sertchState.issuedFrom),
          lt: sertchState.issuedTo && new Date(sertchState.issuedTo),
        },
      },
      orderBy: {
        badgeIssuedon: "desc",
      },
    }),
    prisma.submission.findMany({
      where: {
        mywalletId: mywalletId,
      },
    }),
    prisma.badgeCustomer.findMany(),
    prisma.submission.count({
      where: {
        mywalletId: mywalletId,
      },
    }),
    prisma.badgeVc.count({
      where: {
        mywalletId: mywalletId,
      },
    }),
  ]);

  const badgeVcList: BadgeVcList = badgeVcs.map((badgeVc: BadgeVc): DisplayBadgeVc => {
    const vc: DisplayBadgeVc = {
      badgeVcId: badgeVc.badgeVcId,
      badgeName: badgeVc.badgeName,
      badgeIssuerName: badgeVc.badgeIssuerName,
      badgeIssuedon: badgeVc.badgeIssuedon.toDateString(),
      vcDataPayload: badgeVc.vcDataPayload,
      submissions: [],
    };

    const submission = submissions.filter((s) => s.badgeVcId === badgeVc.badgeVcId);
    submission.forEach((sub) => {
      vc.submissions.push({
        customerName: sub.customerName,
        submitedAt: sub.submitedAt.toDateString(),
      });
    });

    return vc;
  });

  const submissionsAll: SubmissionsAll = {
    totalSubmission: submissionCount,
    detailSubmissions: [],
  };

  const submitList = submissions.filter((x) => x.mywalletId === mywalletId);
  customers.forEach((customer) => {
    if (!submitList.some((x) => x.customerId === customer.customerId)) return;

    submissionsAll.detailSubmissions.push({
      cabinetToSubmit: customer.customerName,
      submitCount: submissions.filter((item) => item.customerId === customer.customerId).length,
    });
  });

  const data: CredentialList = {
    badgeVcList: badgeVcList,
    submissionsAll: submissionsAll,
    totalBadgeCount: badgeCount,
  };

  res.status(200).json({ data });
}
