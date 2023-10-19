import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const deleteVcId = req.query.badgeVcId;

  // TODO: 日付のフォーマット形式
  try {
    await prisma.badgeVc.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        badgeVcId: Number(deleteVcId),
      },
    });

    res.status(200).json({});
  } catch (e) {
    res.status(400).json({ error: e });
  }
}
