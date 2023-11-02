import type { NextApiRequest, NextApiResponse } from "next";

import { errors } from "@/constants/error";
import { Session } from "@/lib/session";
import { getBadgeListFormMoodle as getBadgeListFromMoodle } from "@/server/services/badgeList.service";
import { BadgeListReqestParam, BadgeListResponse } from "@/types/api/badge";
import { ErrorResponse } from "@/types/api/error";

export default async function handler(
  req: NextApiRequest & Session,
  res: NextApiResponse<BadgeListResponse | ErrorResponse>,
) {
  const { username, password, lmsId } = req.body as BadgeListReqestParam;

  // TODO: ログイン情報からウォレットIDを取得する
  const walletId = 1;

  try {
    const badgeList = await getBadgeListFromMoodle({ walletId, username, password, lmsId });

    res.status(200).json(badgeList);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: { errorMessage: errors.response500.message, detail: e } });
  }
}
