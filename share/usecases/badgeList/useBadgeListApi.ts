import { BadgeListState } from "@/share/store/badgeList/types";
import axios from "axios";
import { api } from "../api";

export const useBadgeListApi = async () => {
  const apiPath = api.v1.getVcList;

  const { data } = await axios.get<BadgeListState>(apiPath);

  return { data };
};
