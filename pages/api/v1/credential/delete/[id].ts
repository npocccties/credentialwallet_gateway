import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    await prisma.badgeVc.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        badgeVcId: Number(id),
      },
    });

    res.status(200).json({});
  } catch (e) {
    res.status(400).json({ error: e });
  }
}
