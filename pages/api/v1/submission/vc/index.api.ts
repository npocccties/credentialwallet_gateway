import { z } from "zod";

import type { NextApiRequest, NextApiResponse } from "next";

import { errors } from "@/constants/error";
import { logEndForApi, logStartForApi, logStatus } from "@/constants/log";
import { loggerError, loggerInfo } from "@/lib/logger";
import { getUserInfoFormJwt } from "@/lib/login";
import { sendCabinetForVc } from "@/server/services/submission.service";
import { getWalletId } from "@/server/services/wallet.service";
import { api } from "@/share/usecases/api";
import { ErrorResponse } from "@/types/api/error";
import { SubmissionVcRequestParam } from "@/types/api/submission";
import { SubmissionResponseStatus } from "@/types/status";

const apiPath = api.v1.submission.vc;

const querySchema = z.object({
  consumerId: z.number(),
  badgeVcId: z.number(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ result: SubmissionResponseStatus } | ErrorResponse>,
) {
  loggerInfo(logStartForApi(apiPath));
  loggerInfo("request body", req.body);

  const result = querySchema.safeParse(req.body);

  if (!result.success) {
    loggerError(`${logStatus.error} bad request!`, req.query);

    return res.status(400).json({ error: { errorMessage: errors.response400.message } });
  }

  const { consumerId, email, badgeVcId } = req.body as SubmissionVcRequestParam;
  const jwt = req.cookies.jwt;
  const { eppn } = getUserInfoFormJwt(jwt);

  try {
    const walletId = await getWalletId(eppn);
    const resData = await sendCabinetForVc({ badgeVcId, consumerId, walletId, email });
    loggerInfo(`${logStatus.success} ${apiPath}`, resData);

    return res.status(200).json({ result: resData });
  } catch (e) {
    loggerError(`${logStatus.error} ${apiPath}`, e.message);

    return res.status(500).json({ error: { errorMessage: errors.response500.message, detail: e } });
  } finally {
    loggerInfo(logEndForApi(apiPath));
  }
}
