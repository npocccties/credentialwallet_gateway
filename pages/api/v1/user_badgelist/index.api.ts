import type { NextApiRequest, NextApiResponse } from "next";

import { errors } from "@/constants/error";
import { logEndForApi, logStartForApi, logStatus } from "@/constants/log";
import { getCookieValue } from "@/lib/cookie";
import { loggerError, loggerInfo } from "@/lib/logger";
import prisma from "@/lib/prisma";
import { getUserInfoFormJwt } from "@/lib/userInfo";
import { api } from "@/share/api";
import { UserBadgeList } from "@/types/api/user_badgelist";

const apiPath = api.v1.user_badgelist;

export default async function handler(req: NextApiRequest, res: NextApiResponse<UserBadgeList | {}>) {
  loggerInfo(logStartForApi(apiPath));

  try {
    const session_cookie = getCookieValue("session_cookie");
    const { eppn } = getUserInfoFormJwt(session_cookie);
    const orthrosId = eppn;

    //eppnが取得できない場合
    if (session_cookie == null || eppn == null) {
      loggerError(`${logStatus.error} cannot get eppn in cookie`);

      res.status(400).json({});
      return;
    }

    //walletsテーブルに対応するorthrosIdが登録されているかチェック
    const findWalletId = await prisma.wallet.findMany({
      where: {
        orthrosId: orthrosId,
      },
    });

    //対応するorthrosIdがない場合
    if (!findWalletId || findWalletId.length <= 0) {
      loggerError(`${logStatus.error} bad request! not found orthrosId in DB`);

      res.status(400).json({});
      return;
    }

    //badge_vcsテーブルからreqOrthrosIdに対応するバッジ情報を取得
    const findBadgeList = await prisma.badgeVc.findMany({
      select: {
        badgeClassId: true,
        badgeName: true,
      },
      where: {
        walletId: findWalletId[0].walletId,
      },
    });

    loggerInfo(`${logStatus.success} ${apiPath}`, findBadgeList);

    return res.status(200).json(findBadgeList);
  } catch (e) {
    loggerError(`${logStatus.error} ${apiPath}`, e.message);

    return res.status(500).json({ error: { errorMessage: errors.response500.message, detail: e } });
  } finally {
    loggerInfo(logEndForApi(apiPath));
  }
}
