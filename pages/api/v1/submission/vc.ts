import type { NextApiRequest, NextApiResponse } from "next";

import { errors } from "@/constants/error";
import { logEndForApi, logStartForApi, logStatus } from "@/constants/log";
import { loggerError, loggerInfo } from "@/lib/logger";
import prisma from "@/lib/prisma";
import { api, cabinetApi } from "@/share/usecases/api";
import { ErrorResponse } from "@/types/api/error";
import { SubmissionVcRequestParam } from "@/types/api/submission";

const apiPath = api.v1.submission.vc;

export default async function handler(req: NextApiRequest, res: NextApiResponse<void | ErrorResponse>) {
  loggerInfo(logStartForApi(apiPath));
  loggerInfo("request body", req.body);

  const { consumerId, email, badgeVcId } = req.body as SubmissionVcRequestParam;

  try {
    const [consumer, badgeVc] = await Promise.all([
      prisma.badgeConsumer.findUnique({
        select: {
          cabinetUrl: true,
        },
        where: {
          consumerId: consumerId,
        },
      }),
      prisma.badgeVc.findUnique({
        select: {
          badgeExpires: true,
          vcDataHeader: true,
          vcDataPayload: true,
          vcDataSignature: true,
        },
        where: {
          badgeVcId: badgeVcId,
        },
      }),
    ]);

    const cabinetApiUrl = `${consumer.cabinetUrl}${cabinetApi.v1.submissionBadge}`;
    console.log("cabinetApiUrl", cabinetApiUrl);

    const { vcDataHeader, vcDataPayload } = badgeVc;
    const vcHeader = Buffer.from(vcDataHeader).toString("base64");
    const vcPayload = Buffer.from(vcDataPayload).toString("base64");

    const vcJwt = `${vcHeader}.${vcPayload}.${badgeVc.vcDataSignature}`;
    console.log("vcJwt", vcJwt);
    const resData = { data: "success!" };
    // TODO: cabinetとのつなぎ込み
    // const resData = await axios.post(cabinetApiUrl, {
    //   user_email: email,
    //   badge_vc: vcJwt,
    // });

    console.log("resData", resData);
    loggerInfo(`${logStatus.success} ${apiPath}`, resData);

    return res.status(200);
  } catch (e) {
    loggerError(`${logStatus.error} ${apiPath}`, e.message);

    return res.status(500).json({ error: { errorMessage: errors.response500.message, detail: e } });
  } finally {
    loggerInfo(logEndForApi(apiPath));
  }
}
