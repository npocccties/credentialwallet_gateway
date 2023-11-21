import { z } from "zod";

import type { NextApiRequest, NextApiResponse } from "next";

import { errors } from "@/constants/error";
import { logEndForApi, logStartForApi, logStatus } from "@/constants/log";
import { loggerError, loggerInfo } from "@/lib/logger";
import { getUserInfoFormJwt } from "@/lib/userInfo";
import { deleteBadgeVc } from "@/server/repository/badgeVc";
import { getWalletId } from "@/server/services/wallet.service";
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
  const jwt = req.cookies.jwt;
  const { eppn } = getUserInfoFormJwt(jwt);

  if (!eppn) {
    return res.status(401).json({ error: { errorMessage: errors.unAuthrizedError.detail.noSession } });
  }

  try {
    const walletId = await getWalletId(eppn);
    await deleteBadgeVc({ badgeVcId: id, walletId });

    loggerInfo(`${logStatus.success} ${apiPath}`);

    return res.status(204);
  } catch (e) {
    loggerError(`${logStatus.error} ${apiPath}`, e.message);

    return res.status(500).json({ error: { errorMessage: errors.response500.message, detail: e } });
  } finally {
    loggerInfo(logEndForApi(apiPath));
  }
}
