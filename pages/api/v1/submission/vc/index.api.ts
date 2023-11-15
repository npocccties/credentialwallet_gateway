import { z } from "zod";

import type { NextApiRequest, NextApiResponse } from "next";

import { errors } from "@/constants/error";
import { logEndForApi, logStartForApi, logStatus } from "@/constants/log";
import { loggerError, loggerInfo } from "@/lib/logger";
import { sendCabinetForVc } from "@/server/services/submission.service";
import { api } from "@/share/usecases/api";
import { ErrorResponse } from "@/types/api/error";
import { SubmissionVcRequestParam } from "@/types/api/submission";

const apiPath = api.v1.submission.vc;

const querySchema = z.object({
  consumerId: z
    .string()
    .refine((v) => {
      return !isNaN(Number(v));
    })
    .transform((v) => Number(v)),
  badgeVcId: z
    .string()
    .refine((v) => {
      return !isNaN(Number(v));
    })
    .transform((v) => Number(v)),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse<void | ErrorResponse>) {
  loggerInfo(logStartForApi(apiPath));
  loggerInfo("request body", req.body);

  const result = querySchema.safeParse(req.body);

  if (!result.success) {
    loggerError(`${logStatus.error} bad request!`, req.query);

    return res.status(400).json({ error: { errorMessage: errors.response400.message } });
  }

  const { consumerId, email, badgeVcId } = req.body as SubmissionVcRequestParam;

  try {
    const resData = sendCabinetForVc({ badgeVcId, consumerId });
    console.log("resData", resData);
    loggerInfo(`${logStatus.success} ${apiPath}`, resData);

    return res.status(200).json();
  } catch (e) {
    loggerError(`${logStatus.error} ${apiPath}`, e.message);

    return res.status(500).json({ error: { errorMessage: errors.response500.message, detail: e } });
  } finally {
    loggerInfo(logEndForApi(apiPath));
  }
}
