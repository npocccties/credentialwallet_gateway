import axios from "axios";

import { createSubmission, findConsumerAndBadgeVc } from "../repository/submissionBadge";

import { submissionResult } from "@/constants";
import { logStatus } from "@/constants/log";
import { loggerError, loggerInfo } from "@/lib/logger";
import { cabinetApi } from "@/share/usecases/api";
import { SubmissionResponseStatus } from "@/types/status";

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
  // await axios.post(url, {
  //   message: message,
  // });
};

type SubmissionResponse = {
  reason_code: number;
  reason_msg: string;
};

export const sendCabinetForVc = async ({
  badgeVcId,
  consumerId,
  walletId,
  email,
}: {
  badgeVcId: number;
  consumerId: number;
  walletId: number;
  email: string;
}): Promise<SubmissionResponseStatus> => {
  const { consumer, badgeVc } = await findConsumerAndBadgeVc({ badgeVcId, consumerId });

  const cabinetApiUrl = `${consumer.cabinetUrl}${cabinetApi.v1.submissionBadge}`;
  loggerInfo("request cabinetApiUrl", cabinetApiUrl);

  const { vcDataHeader, vcDataPayload } = badgeVc;
  const vcHeader = Buffer.from(vcDataHeader).toString("base64");
  const vcPayload = Buffer.from(vcDataPayload).toString("base64");

  const vcJwt = `${vcHeader}.${vcPayload}.${badgeVc.vcDataSignature}`;
  try {
    await axios.post<SubmissionResponse>(cabinetApiUrl, {
      user_email: email,
      badge_vc: vcJwt,
    });

    await createSubmission({ badgeVcId, walletId, email, consumerId, consumerName: consumer.consumerName });
    return "success";
  } catch (e) {
    const { badEmailAddress, badReqestOther, verifyBadgeNG, verifyVcNG } = submissionResult;
    const { status, data } = e.response;

    if (status === 400) {
      loggerError(`${logStatus.error} submission badge error!`, data.reason_code);
      switch (data.reason_code) {
        case badEmailAddress:
          return "invalid adress";
        case verifyBadgeNG:
        case verifyVcNG:
          return "verification failure";
        case badReqestOther:
          return "other errors";
        default:
          throw new Error("invalid api access error");
      }
    } else {
      loggerError(`${logStatus.error} submission An unexpected error!`);
      throw new Error(e.message);
    }
  }
};
