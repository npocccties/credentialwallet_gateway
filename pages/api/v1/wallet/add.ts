import type { NextApiRequest, NextApiResponse } from "next";

import { errors } from "@/constants/error";
import { logEndForApi, logStartForApi, logStatus } from "@/constants/log";
import { loggerInfo, loggerError } from "@/lib/logger";
import { api } from "@/share/usecases/api";

const apiPath = api.v1.wallet.add;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  loggerInfo(logStartForApi(apiPath));

  try {
    loggerInfo(`${logStatus} ${apiPath}`);

    // TODO: walletの登録処理を実装

    res.status(200).json({});
  } catch (e) {
    loggerError(`${logStatus.error} ${apiPath}`, e.message);

    res.status(500).json({ error: { errorMessage: errors.response500.message, detail: e } });
  }
  loggerInfo(logEndForApi(apiPath));
}
