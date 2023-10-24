import axios from "axios";

import { api } from "../api";

import { BadgeList, BadgeListReqestParam } from "@/types/api/badge/index";

type BadgeListApiResponse = {
  badgeList: BadgeList;
};

export const useBadgeListApi = async (param: BadgeListReqestParam) => {
  const apiPath = api.v1.badge.list;
  const { username, isNeedSSO, lmsUrl, password } = param;

  const res = await axios.post<BadgeListApiResponse>(apiPath, {
    username,
    password,
    isNeedSSO,
    lmsUrl,
  });

  return res.data;
};
