import type { NextApiRequest, NextApiResponse } from "next";

import { myOpenBadge } from "@/server/services/lmsAccess.service";
import { BadgeMetaDataApiResponse } from "@/share/usecases/badgeMetaData/useFetchBadgeMetaDataApi";

export default async function handler(req: NextApiRequest, res: NextApiResponse<BadgeMetaDataApiResponse>) {
  const uniquehash = req.query.uniquehash as string;
  const lmsUrl = req.query.lmsUrl as string;

  const badgeMetaData = await myOpenBadge(uniquehash, lmsUrl);
  res.status(200).json({ data: badgeMetaData });
}
