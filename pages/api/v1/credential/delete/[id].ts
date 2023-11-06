import { z } from "zod";

import type { NextApiRequest, NextApiResponse } from "next";

import { errors } from "@/constants/error";
import { logEndForApi, logStartForApi, logStatus } from "@/constants/log";
import { loggerError, loggerInfo } from "@/lib/logger";
import prisma from "@/lib/prisma";
import { api } from "@/share/usecases/api";
import { ErrorResponse } from "@/types/api/error";

const querySchema = z.object({
  id: z
    .string()
    .refine((v) => {
      return !isNaN(Number(v));
    })
    .transform((v) => Number(v)),
});

const apiPath = api.v1.credential.delete;

export default async function handler(req: NextApiRequest, res: NextApiResponse<void | ErrorResponse>) {
  loggerInfo(logStartForApi(apiPath));
  loggerInfo("request query", req.query);

  const result = querySchema.safeParse(req.query);
  if (!result.success) {
    loggerError(`${logStatus.error} bad request!`, req.query);

    return res.status(400).json({ error: { errorMessage: errors.response400.message } });
  }

  const { id } = result.data;

  try {
    await prisma.badgeVc.delete({
      where: {
        badgeVcId: id,
      },
    });

    loggerInfo(`${logStatus.success} ${apiPath}`);

    res.status(204);
  } catch (e) {
    loggerError(`${logStatus.error} ${apiPath}`, e.message);

    res.status(500).json({ error: { errorMessage: errors.response500.message, detail: e } });
  }
  loggerInfo(logEndForApi(apiPath));
}
