import { withIronSessionApiRoute } from "iron-session/next";
import { z } from "zod";

import type { NextApiRequest, NextApiResponse } from "next";

import { errors } from "@/constants/error";
import { logEndForApi, logStartForApi, logStatus } from "@/constants/log";
import { loggerInfo, loggerError } from "@/lib/logger";
import prisma from "@/lib/prisma";
import { sessionOptions } from "@/lib/session";
import { api } from "@/share/usecases/api";
import { ErrorResponse } from "@/types/api/error";

const querySchema = z.object({
  eppn: z.string(),
});

const apiPath = api.v1.wallet.add;

async function handler(req: NextApiRequest, res: NextApiResponse<void | ErrorResponse>) {
  loggerInfo(logStartForApi(apiPath));
  loggerInfo("request session", req.session);

  const result = querySchema.safeParse(req.session);

  if (!result.success) {
    loggerError(`${logStatus.error} bad request!`, req.body);

    return res.status(400).json({ error: { errorMessage: errors.response400.message } });
  }

  const eppn = result.data.eppn;

  if (!eppn) {
    return res.status(401).json({ error: { errorMessage: errors.unAuthrizedError.detail.noSession } });
  }

  try {
    await prisma.wallet.create({
      data: {
        orthrosId: eppn,
        createdAt: new Date(),
      },
    });

    loggerInfo(`${logStatus.success} ${apiPath}`);
    return res.status(200).json();
  } catch (e) {
    loggerError(`${logStatus.error} ${apiPath}`, e.message);

    return res.status(500).json({ error: { errorMessage: errors.response500.message, detail: e } });
  } finally {
    loggerInfo(logEndForApi(apiPath));
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
