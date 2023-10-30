import { BadgeList, BadgeListReqestParam } from "@/types/api/badge";

export type BadgeListState = BadgeList;

export type BadgeListGetters = {
  useBadgeList: () => BadgeListState;
};

export type BadgeListActions = {
  useFetchBadgeList: () => {
    fetchBadgeList: (param: BadgeListReqestParam) => Promise<void>;
  };
  useClearBadgeList: () => {
    clearBadgeList: () => void;
  };
};
