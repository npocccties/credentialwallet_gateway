import axios from "axios";

import { api } from "../api";

import { SubmissionVcRequestParam } from "@/types/api/submission";

export const useSubmissionVcApi = async (param: SubmissionVcRequestParam): Promise<Response> => {
  const { consumerId, email, badgeVcId } = param;
  const apiPath = api.v1.submission.vc;

  const res = await axios.post(apiPath, {
    consumerId,
    email,
    badgeVcId,
  });

  return res.data;
};
