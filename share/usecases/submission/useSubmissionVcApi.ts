import { api } from "../api";

import { axiosClient } from "@/lib/axios";
import { SubmissionVcRequestParam } from "@/types/api/submission";

export const useSubmissionVcApi = async (param: SubmissionVcRequestParam): Promise<Response> => {
  const { consumerId, email, badgeVcId } = param;
  const apiPath = api.v1.submission.vc;

  const res = await axiosClient.post(apiPath, {
    consumerId,
    email,
    badgeVcId,
  });

  return res.data;
};
