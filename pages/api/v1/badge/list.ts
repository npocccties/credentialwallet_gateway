import { withIronSessionApiRoute } from "iron-session/next";

import type { NextApiRequest, NextApiResponse } from "next";

import { errors } from "@/constants/error";
import { logEndForApi, logStartForApi, logStatus } from "@/constants/log";
import { loggerError, loggerInfo } from "@/lib/logger";
import { sessionOptions } from "@/lib/session";
import { getBadgeListFormMoodle as getBadgeListFromMoodle } from "@/server/services/badgeList.service";
import { getWalletId } from "@/server/services/wallet.service";
import { api } from "@/share/usecases/api";
import { BadgeListReqestParam, BadgeListResponse } from "@/types/api/badge";
import { ErrorResponse } from "@/types/api/error";

const apiPath = api.v1.badge.list;

async function handler(req: NextApiRequest, res: NextApiResponse<BadgeListResponse | ErrorResponse>) {
  loggerInfo(logStartForApi(apiPath));
  const { username, password, lmsId } = req.body as BadgeListReqestParam;

  loggerInfo("request body", { username, password: "****", lmsId });

  const eppn = req.session.eppn;

  try {
    const walletId = await getWalletId(eppn);
    const badgeList = await getBadgeListFromMoodle({ walletId, username, password, lmsId });

    loggerInfo(`${logStatus.success} ${apiPath}`, badgeList);

    return res.status(200).json(badgeList);
  } catch (e) {
    loggerError(`${logStatus.error} ${apiPath}`, e.message);

    return res.status(500).json({ error: { errorMessage: errors.response500.message, detail: e } });
  } finally {
    loggerInfo(logEndForApi(apiPath));
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
