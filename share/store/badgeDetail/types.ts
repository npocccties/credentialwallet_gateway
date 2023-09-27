import { badge_vcs, submissions } from "@prisma/client";

type BadgeVcs = badge_vcs;
type Submissions = submissions;

export type BadgeDetailState = {
  badgeVcs: BadgeVcs | undefined;
  submissions: Submissions | undefined;
};

export type BadgeDetailGetters = {
  useBadgeDetail: () => BadgeDetailState;
};

export type BadgeDetailActions = {
  useFetchBadgeDetail: () => {
    fetchBadgeDetail: (vsId: string) => void;
  };
};
