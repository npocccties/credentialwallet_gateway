import { z } from "zod";

import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

const querySchema = z.object({
  id: z
    .string()
    .refine((v) => {
      return !isNaN(Number(v));
    })
    .transform((v) => Number(v)),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const result = querySchema.safeParse(req.query);
  if (!result.success) {
    return res.status(400).json({ error: { message: "idが不正な値です" } });
  }

  const { id } = result.data;

  try {
    await prisma.badgeVc.delete({
      where: {
        badgeVcId: Number(id),
      },
    });

    res.status(204);
  } catch (e) {
    res.status(400).json({ error: e });
  }
}
