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

export type CredentialList = {
  badgeVc: {
    badgeVcId: number;
    badgeName: string;
    badgeIssuerName: string;
    badgeIssuedon: string;
    vcDataPayload: string;
    submissions: [
      {
        customerName: string;
        submitedAt: string;
      },
    ];
  }[];
  submissionsAll: {
    totalSubmission: number;
    detailSubmissions: [
      {
        cabinetToSubmit: string;
        submitCount: number;
      },
    ];
  };
  totalBadgeCount: number;
};
