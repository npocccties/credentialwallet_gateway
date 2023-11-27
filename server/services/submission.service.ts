import axios from "axios";
import base64url from "base64url";
import { createTransport } from "nodemailer";

import { findCabinetUrl } from "../repository/badgeConsumer";
import { createSubmission, findConsumerAndBadgeVc } from "../repository/submissionBadge";

import { submissionResult } from "@/constants";
import { logStatus } from "@/constants/log";
import { loggerError, loggerInfo } from "@/lib/logger";
import { cabinetApi } from "@/share/usecases/api";
import { SubmissionResponseStatus } from "@/types/status";

const smtpHost = process.env.smtp_mail_server_host;
const smtpPort = process.env.smtp_mail_server_port;

export const createMailTemplate = (confirmCode: string) => {
  const messageTemplate = `
  下記のワンタイムパスワードを入力して{キャビネット提出先の組織名} にバッジを提出してください。
  ───────────────────────────────────
  ■ワンタイムパスワード■
  ───────────────────────────────────
  ${confirmCode}
  ───────────────────────────────────
  
  
  
  ※このメールに心当たりの無い方は、本メールの破棄をお願いいたします。
  ※このメールはシステムより自動配信されています。返信は受付できませんので、ご了承ください。
  `;

  return messageTemplate;
};

export const sendMail = async (email: string, message: string, consumerId: number) => {
  const { cabinetUrl } = await findCabinetUrl({ consumerId });

  const options = {
    host: smtpHost,
    port: Number(smtpPort),
    secure: false,
    requireTLS: false,
    tls: {
      // TODO: 開発環境でのみ使用
      rejectUnauthorized: false,
    },
  };

  const url = new URL(cabinetUrl);
  const host = url.host;

  const mail = {
    from: `no-reply@${host}.com`,
    to: email,
    subject: "バッジ提出ワンタイムパスワード",
    text: message,
    html: `<div>${message}</div>`,
  };

  console.log("options", options);
  try {
    const transport = createTransport(options);
    const result = await transport.sendMail(mail);
    console.log("result---------", result);
  } catch (e) {
    // TODO: エラーをthrowする
    console.log(e);
  }
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
  externalLinkageId,
}: {
  badgeVcId: number;
  consumerId: number;
  walletId: number;
  email: string;
  externalLinkageId: string;
}): Promise<SubmissionResponseStatus> => {
  const { consumer, badgeVc } = await findConsumerAndBadgeVc({ badgeVcId, consumerId });

  const cabinetApiUrl = `${consumer.cabinetUrl}${cabinetApi.v1.submissionBadge}`;
  loggerInfo("request cabinetApiUrl", cabinetApiUrl);

  const { vcDataHeader, vcDataPayload } = badgeVc;

  const vcHeader = base64url(vcDataHeader);
  const vcPayload = base64url(vcDataPayload);

  const vcJwt = `${vcHeader}.${vcPayload}.${badgeVc.vcDataSignature}`;
  try {
    await axios.post<SubmissionResponse>(cabinetApiUrl, {
      user_email: email,
      badge_vc: vcJwt,
      user_id: externalLinkageId,
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
