import { BadgeVc, Submissions } from "@prisma/client";

/**
 * Tables
 */

export type SearchFormItem = {
  badgeName: string;
  issuerName: string;
  issueDateTo: string;
  issueDateEnd: string;
  category: string;
};

export type BadgeList = {
  badgeList: {
    badgeVcList: BadgeVc[];
    dataCount?: number;
  };
};

export type BadgeDetail = {
  badgeVc: BadgeVc | undefined;
  submissions: Submissions[];
};
