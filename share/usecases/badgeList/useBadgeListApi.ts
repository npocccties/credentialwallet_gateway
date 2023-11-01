import { api } from "../api";

import { axiosClient } from "@/lib/axios";
import { BadgeList, BadgeListReqestParam } from "@/types/api/badge/index";

type BadgeListApiResponse = {
  badgeList: BadgeList;
};

export const useBadgeListApi = async (param: BadgeListReqestParam) => {
  const apiPath = api.v1.badge.list;
  const { username, lmsId, password } = param;

  const res = await axiosClient.post<BadgeListApiResponse>(apiPath, {
    username,
    password,
    lmsId,
  });

  return res.data;
};
