import { BadgeVcSubmission, DisplayBadgeVc } from "@/types/api/credential";

export type CredentialDetail = {
  vcDetaildata: VcDetailData;
  knowledgeBadges: KnowledgeBadges;
  submissionsHistories: SubmissionsHistories;
  badgeExportData: string;
};

export type VcDetailData = DisplayBadgeVc & {
  badgeEmail: string;
  badgeExpires: string;
  courseUrl: string;
  submissions: BadgeVcSubmission[];
};

export type KnowledgeBadges = KnowledgeBadge[];

export type KnowledgeBadge = {
  badgeImage: string;
  badgeName: string;
};

export type SubmissionsHistories = SubmissionsHistory[];

export type SubmissionsHistory = {
  customerName: string;
  submitedAt: string;
};
