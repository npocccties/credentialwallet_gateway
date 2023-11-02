import { api } from "../api";

import { axiosClient } from "@/lib/axios";
import { BadgeListReqestParam, BadgeListResponse } from "@/types/api/badge/index";

export const useBadgeListApi = async (param: BadgeListReqestParam) => {
  const apiPath = api.v1.badge.list;
  const { username, lmsId, password } = param;

  const res = await axiosClient.post<BadgeListResponse>(apiPath, {
    username,
    password,
    lmsId,
  });

  return res.data;
};
