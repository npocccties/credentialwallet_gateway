export type CredentialListResponse = {
  data: CredentialList;
};

export type SearchFormItem = {
  badgeName?: string;
  issuedFrom?: string | Date;
  issuedTo?: string | Date;
  sortOrder: string;
};

export type CredentialList = {
  badgeVcList: BadgeVcList;
  submissionsAll: SubmissionsAll;
  totalBadgeCount: number;
};

export type DisplayBadgeVc = {
  badgeVcId: number;
  badgeName: string;
  badgeIssuerName: string;
  badgeIssuedon: string;
  badgeExpires: string;
  vcDataPayload: string;
  submissions: BadgeVcSubmissions;
};

export type BadgeVcList = DisplayBadgeVc[];

export type BadgeVcSubmission = {
  consumerName: string;
  submitedAt: string;
};

export type BadgeVcSubmissions = BadgeVcSubmission[];

export type SubmissionsAll = {
  totalSubmission: number;
  detailSubmissions: DetailSubmissions;
};

export type DetailSubmission = {
  cabinetToSubmit: string;
  submitCount: number;
};

export type DetailSubmissions = DetailSubmission[];
