import { z } from "zod";

import type { NextApiRequest, NextApiResponse } from "next";

import { errors } from "@/constants/error";
import { logEndForApi, logStartForApi, logStatus } from "@/constants/log";
import { convertJSTstrToUTCdate } from "@/lib/date";
import { loggerError, loggerInfo } from "@/lib/logger";
import { getCredentialList } from "@/server/services/credentialList.service";
import { api } from "@/share/usecases/api";
import { CredentialList, CredentialListResponse, SearchFormItem } from "@/types/api/credential";
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CredentialListResponse | ErrorResponse>,
) {
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
  // TODO: ログイン判定処理

  try {
    // TODO: SAMLのOrthorsIDをもとに、walletIdを取得しセットする
    const walletId = 1;
    const searchState: SearchFormItem = {
      badgeName: badgeName,
      issuedFrom: issuedFrom === "" || !issuedFrom ? undefined : convertJSTstrToUTCdate(issuedFrom.toString()),
      issuedTo: issuedTo === "" || !issuedTo ? undefined : convertJSTstrToUTCdate(issuedTo.toString()),
      sortOrder: sortOrder,
    };

    const { badgeVcList, submissionsAll, totalBadgeCount } = await getCredentialList({ searchState, walletId });
    const data: CredentialList = {
      badgeVcList: badgeVcList,
      submissionsAll: submissionsAll,
      totalBadgeCount: totalBadgeCount,
    };
    loggerInfo(`${logStatus.success} ${apiPath}`);

    return res.status(200).json({ data });
  } catch (e) {
    loggerError(`${logStatus.error} ${apiPath}`, e.message);

    return res.status(500).json({ error: { errorMessage: errors.response500.message, detail: e } });
  } finally {
    loggerInfo(`${logEndForApi(apiPath)}`);
  }
}
