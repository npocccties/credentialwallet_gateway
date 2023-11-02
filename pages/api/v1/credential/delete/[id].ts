import { z } from "zod";

import type { NextApiRequest, NextApiResponse } from "next";

import { errors } from "@/constants/error";
import prisma from "@/lib/prisma";
import { ErrorResponse } from "@/types/api/error";

const querySchema = z.object({
  id: z
    .string()
    .refine((v) => {
      return !isNaN(Number(v));
    })
    .transform((v) => Number(v)),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse<void | ErrorResponse>) {
  const result = querySchema.safeParse(req.query);
  if (!result.success) {
    return res.status(400).json({ error: { errorMessage: errors.response400.message } });
  }

  const { id } = result.data;

  try {
    await prisma.badgeVc.delete({
      where: {
        badgeVcId: id,
      },
    });

    res.status(204);
  } catch (e) {
    res.status(500).json({ error: { errorMessage: errors.response500.message, detail: e } });
  }
}
