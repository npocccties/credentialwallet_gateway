import { z } from "zod";

import type { NextApiRequest, NextApiResponse } from "next";

import { errors } from "@/constants/error";
import { myOpenBadge } from "@/server/services/lmsAccess.service";
import { BadgeMetaDataApiResponse } from "@/share/usecases/badgeMetaData/useFetchBadgeMetaDataApi";
import { ErrorResponse } from "@/types/api/error";

const querySchema = z.object({
  uniquehash: z.string(),
  lmsUrl: z.string().url(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BadgeMetaDataApiResponse | ErrorResponse>,
) {
  const result = querySchema.safeParse(req.query);

  if (!result.success) {
    return res.status(400).json({ error: { errorMessage: errors.response400.message } });
  }

  const { uniquehash, lmsUrl } = result.data;

  try {
    const badgeMetaData = await myOpenBadge(uniquehash, lmsUrl);

    res.status(200).json({ data: badgeMetaData });
  } catch (e) {
    res.status(500).json({ error: { errorMessage: errors.response500.message, detail: e } });
  }
}
