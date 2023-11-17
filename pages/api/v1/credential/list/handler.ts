import { withIronSessionApiRoute } from "iron-session/next";
import { z } from "zod";

import type { NextApiRequest, NextApiResponse } from "next";

import { errors } from "@/constants/error";
import { logEndForApi, logStartForApi, logStatus } from "@/constants/log";
import { convertJSTstrToUTCdate, convertJSTstrToUTCdateAddOneDay } from "@/lib/date";
import { loggerError, loggerInfo } from "@/lib/logger";
import { sessionOptions } from "@/lib/session";
import { getCredentialList } from "@/server/services/credentialList.service";
import { getWalletId } from "@/server/services/wallet.service";
import { api } from "@/share/usecases/api";
import { CredentialList, SearchFormItem } from "@/types/api/credential";
import { ErrorResponse } from "@/types/api/error";

const isValidDate = (value: string): boolean => {
  if (value === "") return true;
  const timestamp = Date.parse(value);
  return !isNaN(timestamp);
};

const querySchema = z.object({
  badgeName: z.string().optional(),
  issuedFrom: z.union([z.string().refine(isValidDate), z.date()]).optional(),
  issuedTo: z.union([z.string().refine(isValidDate), z.date()]).optional(),
  sortOrder: z.string(),
});

const apiPath = api.v1.credential.list;

<<<<<<< HEAD:pages/api/v1/credential/list.ts
async function handler(req: NextApiRequest, res: NextApiResponse<CredentialListResponse | ErrorResponse>) {
=======
async function handler(req: NextApiRequest, res: NextApiResponse<CredentialList | ErrorResponse>) {
>>>>>>> feature-add-test:pages/api/v1/credential/list/handler.ts
  loggerInfo(`${logStartForApi(apiPath)}`);
  loggerInfo("request query", req.query);
  // const perPage = 10;
  // const skip = perPage * (req.body.page - 1);

  const result = querySchema.safeParse(req.query);
  if (!result.success) {
    loggerError(`${logStatus.error} bad request!`, req.query);

    return res.status(400).json({ error: { errorMessage: errors.response400.message } });
  }

  const { badgeName, issuedFrom, issuedTo, sortOrder } = result.data;
  const eppn = req.session.eppn;

  if (!eppn) {
    return res.status(401).json({ error: { errorMessage: errors.unAuthrizedError.detail.noSession } });
  }

  try {
    const walletId = await getWalletId(eppn);
    const searchState: SearchFormItem = {
      badgeName: badgeName,
      issuedFrom: issuedFrom === "" || !issuedFrom ? undefined : convertJSTstrToUTCdate(issuedFrom.toString()),
      issuedTo: issuedTo === "" || !issuedTo ? undefined : convertJSTstrToUTCdateAddOneDay(issuedTo.toString()),
      sortOrder: sortOrder,
    };

    const { badgeVcList, submissionsAll, totalBadgeCount } = await getCredentialList({ searchState, walletId });
    loggerInfo(`${logStatus.success} ${apiPath}`);

    return res.status(200).json({ badgeVcList, submissionsAll, totalBadgeCount });
  } catch (e) {
    loggerError(`${logStatus.error} ${apiPath}`, e.message);

    return res.status(500).json({ error: { errorMessage: errors.response500.message, detail: e } });
  } finally {
    loggerInfo(`${logEndForApi(apiPath)}`);
  }
}

<<<<<<< HEAD:pages/api/v1/credential/list.ts
export default withIronSessionApiRoute(handler, sessionOptions);
=======
export default handler;
>>>>>>> feature-add-test:pages/api/v1/credential/list/handler.ts
