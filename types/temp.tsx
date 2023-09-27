import { badge_vcs } from "@prisma/client";

export type SearchFormItem = {
  badgeName: string;
  issuerName: string;
  issueDateTo: string;
  issueDateEnd: string;
  category: string;
};

export type BadgeVcs = badge_vcs;
