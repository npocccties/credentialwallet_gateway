import { badge_vcs } from "@prisma/client";

type BadgeVcs = badge_vcs;

export type BadgeListState = {
  badgeList: {
    badgeVcList: BadgeVcs[];
    dataCount?: number;
  };
};

export type BadgeListGetters = {
  useBadgeList: () => BadgeListState;
};

export type BadgeListActions = {
  useFetchBadgeList: () => {
    fetchBadgeList: () => void;
  };
  // useSetBadgeVc: () => {
  //   setBadge: (badge: BadgeVcs) => void;
  // };
};
