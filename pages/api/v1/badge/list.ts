import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";
import { Session, withSession } from "@/lib/session";
import { myBadgesList } from "@/server/services/lmsAccess.service";
import { BadgeListReqestParam } from "@/types/api/badge";
import { IfBadgeInfo } from "@/types/BadgeInfo";

type Data = {
  badgeList: IfBadgeInfo[];
};

export default async function handler(req: NextApiRequest & Session, res: NextApiResponse<Data>) {
  const { username, password, lmsId } = req.body as BadgeListReqestParam;

  // TODO: ログイン情報からウォレットIDを取得する
  const walletId = 1;
  const [badgeVcs, selectLms] = await Promise.all([
    prisma.badgeVc.findMany({
      select: {
        badgeVcId: true,
        walletId: true,
        badgeUniquehash: true,
      },
      where: {
        walletId: walletId,
      },
    }),
    prisma.lmsList.findUnique({
      where: {
        lmsId: lmsId,
      },
    }),
  ]);

  await withSession(req, res);
  const sessionId = req.session.id;

  try {
    const badgeList: IfBadgeInfo[] = await myBadgesList(username, password, selectLms);

    badgeList.map((badge) => {
      if (badgeVcs.some((x) => x.badgeUniquehash === badge.uniquehash)) {
        badge.vcConverted = true;
        return;
      }
      badge.vcConverted = false;
    });

    res.status(200).json({ badgeList });
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
}
