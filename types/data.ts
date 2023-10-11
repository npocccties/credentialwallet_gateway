import { BadgeVc, Submission } from "@prisma/client";

/**
 * Tables
 */

export type BadgeList = {
  badgeList: {
    badgeVcList: BadgeVc[];
    dataCount?: number;
  };
};

export type BadgeDetail = {
  badgeVc: BadgeVc | undefined;
  submissions: Submission[];
};
