import axios from "axios";

import { api } from "../api";

import { SendMail, SubmissionEmailRequestParam } from "@/types/api/submission";

type Response = SendMail;

export const useSubmissionEmailApi = async (param: SubmissionEmailRequestParam): Promise<Response> => {
  const { consumerId, email } = param;
  const apiPath = api.v1.submission.sendmail;

  const res = await axios.post(apiPath, {
    consumerId: consumerId,
    email: email,
  });

  return res.data;
};
