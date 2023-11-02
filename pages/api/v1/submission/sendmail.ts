import crypto from "crypto";

import type { NextApiRequest, NextApiResponse } from "next";

import { errors } from "@/constants/error";
import { validateEmail } from "@/lib/validation";
import { ErrorResponse } from "@/types/api/error";
import { SendMail, SubmissionEmailRequestParam } from "@/types/api/submission";

type SuccessResponse = SendMail;

export default async function handler(req: NextApiRequest, res: NextApiResponse<SuccessResponse | ErrorResponse>) {
  const { consumerId, email } = req.body as SubmissionEmailRequestParam;

  if (!validateEmail(email)) {
    res.status(400).json({ error: { errorMessage: errors.validation.email } });
  }
  // TODO: メールサーバーに送信する情報を作成

  try {
    const confirmCode = Math.floor(100000 + Math.random() * 900000).toString();

    console.log("confirmCode", confirmCode);
    const hashConfirmCode = crypto.createHash("sha256").update(confirmCode).digest("hex");

    // TODO: メールサーバーにリクエストを送信
    res.status(200).json({ hashConfirmCode, confirmCode });
  } catch (e) {
    res.status(500).json({ error: { errorMessage: errors.response500.message, detail: e } });
  }
}
