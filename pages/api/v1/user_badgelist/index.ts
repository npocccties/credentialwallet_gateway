import { Parser } from "xml2js";

import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";
import { UserBadgeList } from "@/types/api/user_badgelist";

export default async function handler(req: NextApiRequest, res: NextApiResponse<UserBadgeList | {}>) {
  var SamlResponse_atob: string, SamlResponse_xml;
  const { method, body } = req;
  const { SamlResponse, saml } = body;

  if (method !== "POST") {
    res.status(400).json({});
    return;
  }

  //SAML値チェック関数呼び出し(認証OKの場合TRUEを返す)
  //  [TODO]現状SAML対応されていないため保留とする
  //const check = checkSamlResponse(SamlResponse);
  const check = true;

  //INPUT: reqOrthrosId
  //  [TODO]本来の想定ではSAML値から抽出するが
  //  現実装ではsamlパラメータに平文で入っている物とする
  //  Walletとe-PortfolioををSAML対応する時に調整
  const reqOrthrosId = saml;

  //入力パラメータ不正の場合
  if (!check || !reqOrthrosId) {
    res.status(400).json({});
    return;
  }

  //walletsテーブルに対応するorthrosIdが登録されているかチェック
  const findWalletId = await prisma.wallet.findMany({
    where: {
      orthrosId: reqOrthrosId,
    },
  });

  //console.log(findWalletId);

  //対応するorthrosIdがない場合
  if (!findWalletId || findWalletId.length <= 0) {
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

  console.log(findBadgeList);

  res.status(200).json(findBadgeList);
  return;
}

function checkSamlResponse(SamlResponse) {
  var SamlResponse_atob: string, SamlResponse_xml;

  try {
    SamlResponse_atob = atob(SamlResponse);
    new Parser().parseString(SamlResponse_atob, (err, data) => {
      if (err) {
        console.log("Fail2");
        console.log(err);
      } else {
        SamlResponse_xml = data;
      }
    });
  } catch (e) {
    console.log("Fail1");
    console.log(e);
  }

  console.log(`SamlResponse: ${SamlResponse}`);
  console.log(`SamlResponse_atob: ${SamlResponse_atob}`);
  console.log("SamlResponse_xml: ");
  console.log(SamlResponse_xml);

  if (!SamlResponse_xml) {
    return false;
  }

  return true;
}
