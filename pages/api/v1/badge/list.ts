import type { NextApiRequest, NextApiResponse } from "next";

import { myBadgesList } from "@/lib/moodle";
import { Session, withSession } from "@/lib/session";
import { IfBadgeInfo } from "@/types/BadgeInfo";

type Data = {
  badgeList: IfBadgeInfo[];
};

export default async function handler(req: NextApiRequest & Session, res: NextApiResponse<Data>) {
  const { username, password, isNeedSSO, moodleUrl } = req.body;

  await withSession(req, res);
  const sessionId = req.session.id;

  const badgeList: IfBadgeInfo[] = await myBadgesList(username, password, isNeedSSO, moodleUrl);
  res.status(200).json({ badgeList });
}
