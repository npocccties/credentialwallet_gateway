import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { errors } from "@/constants/error";
import { logStartForApi, logStatus, logEndForApi } from "@/constants/log";
import { loggerInfo, loggerError } from "@/lib/logger";
import { createWallet } from "@/server/repository/wallet";
import { api } from "@/share/usecases/api";
import { ErrorResponse } from "@/types/api/error";

const querySchema = z.object({
  eppn: z.string(),
});
const apiPath = api.v1.wallet.add;

async function handler(req: NextApiRequest, res: NextApiResponse<void | ErrorResponse>) {
  loggerInfo(logStartForApi(apiPath));
  loggerInfo("request session", req.session);

  if (!req.session) {
    return res.status(401).json({ error: { errorMessage: errors.unAuthrizedError.detail.noSession } });
  }

  const result = querySchema.safeParse(req.session);

  if (!result.success) {
    loggerError(`${logStatus.error} bad request!`, req.body);

    return res.status(400).json({ error: { errorMessage: errors.response400.message } });
  }

  const eppn = result.data.eppn;

  try {
    await createWallet(eppn);

    loggerInfo(`${logStatus.success} ${apiPath}`);
    return res.status(200).json();
  } catch (e) {
    loggerError(`${logStatus.error} ${apiPath}`, e.message);

    return res.status(500).json({ error: { errorMessage: errors.response500.message, detail: e } });
  } finally {
    loggerInfo(logEndForApi(apiPath));
  }
}

export default handler;
