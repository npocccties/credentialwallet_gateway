import type { NextApiRequest, NextApiResponse } from "next";

import { Session } from "@/lib/session";
import { getBadgeListFormMoodle as getBadgeListFromMoodle } from "@/server/services/badgeList.service";
import { BadgeListReqestParam } from "@/types/api/badge";
import { ErrorResponse } from "@/types/api/error";
import { IfBadgeInfo } from "@/types/BadgeInfo";

type ResponseData = {
  badgeList: IfBadgeInfo[];
};

export default async function handler(
  req: NextApiRequest & Session,
  res: NextApiResponse<ResponseData | ErrorResponse>,
) {
  const { username, password, lmsId } = req.body as BadgeListReqestParam;

  // TODO: ログイン情報からウォレットIDを取得する
  const walletId = 1;

  try {
    const badgeList = await getBadgeListFromMoodle({ walletId, username, password, lmsId });

    res.status(200).json({ badgeList });
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
}
