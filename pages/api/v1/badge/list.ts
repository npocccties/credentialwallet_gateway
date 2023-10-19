import type { NextApiRequest, NextApiResponse } from "next";

import { myBadgesList } from "@/lib/moodle";
import prisma from "@/lib/prisma";
import { Session, withSession } from "@/lib/session";
import { IfBadgeInfo } from "@/types/BadgeInfo";

type Data = {
  badgeList: IfBadgeInfo[];
};

export default async function handler(req: NextApiRequest & Session, res: NextApiResponse<Data>) {
  const { username, password, isNeedSSO, moodleUrl } = req.body;

  await withSession(req, res);
  const sessionId = req.session.id;

  // TODO: SSO時のTokenの取得タイミング検討
  const badgeList: IfBadgeInfo[] = await myBadgesList(username, password, isNeedSSO, moodleUrl);

  // TODO: ログイン情報からマイウォレットIDを取得する
  const walletId = 1;
  const badgeVcs = await prisma.badgeVc.findMany({
    select: {
      badgeVcId: true,
      walletId: true,
      badgeUniquehash: true,
    },
    where: {
      walletId: walletId,
    },
  });

  badgeList.map((badge) => {
    if (badgeVcs.some((x) => x.badgeUniquehash === badge.uniquehash)) {
      badge.vcConverted = true;
      return;
    }
    badge.vcConverted = false;
  });

  res.status(200).json({ badgeList });
}
