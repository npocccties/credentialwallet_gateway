import axios from "axios";

import prisma from "@/lib/prisma";
import { cabinetApi } from "@/share/usecases/api";

const url = process.env.mail_server_url;

export const createMailTemplate = (email: string, confirmCode: string) => {
  // TODO: メールサーバーに送信する情報を作成
  const template = `
    こんにちわ
    あなたのemailは${email}です
    確認コードは${confirmCode}です
  `;

  return template;
};

export const sendMail = async (message: string) => {
  // TODO: メールサーバーにリクエストを送信
  await axios.post(url, {
    message: message,
  });
};

export const sendCabinetForVc = async ({ badgeVcId, consumerId }: { badgeVcId: number; consumerId: number }) => {
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

  return resData;
};
