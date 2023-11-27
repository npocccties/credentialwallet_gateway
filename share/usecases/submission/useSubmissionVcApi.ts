import { api } from "../api";

import { axiosClient } from "@/lib/axios";
import { SubmissionVcRequestParam } from "@/types/api/submission";
import { SubmissionResponseStatus } from "@/types/status";

export const useSubmissionVcApi = async (
  param: SubmissionVcRequestParam,
): Promise<{ result: SubmissionResponseStatus }> => {
  const { consumerId, email, badgeVcId, externalLinkageId } = param;
  const apiPath = api.v1.submission.vc;

  const res = await axiosClient.post(apiPath, {
    consumerId,
    email,
    badgeVcId,
    externalLinkageId,
  });

  return res.data;
};
