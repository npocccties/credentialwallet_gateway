import axios from "axios";

import { api } from "../api";

import { BadgeImportRequestParam } from "@/types/api/badge/index";

export const useBadgeImportApi = async (param: BadgeImportRequestParam) => {
  const apiPath = api.v1.badge.convert;
  const { uniquehash, email, badgeMetaData } = param;

  console.log("req", apiPath, uniquehash, email, badgeMetaData);
  const res = await axios.post(apiPath, {
    uniquehash,
    email,
    badgeMetaData,
  });

  return res;
};
