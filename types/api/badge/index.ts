export type BadgeListReqestParam = {
  username: string;
  isNeedSSO: boolean;
  moodleUrl: string;
  password?: string;
};

export type BadgeList = BadgeInfo[];

export type BadgeInfo = {
  id: number;
  name: string;
  description: string;
  timecreated: number;
  issuername: string;
  issuerurl: string;
  expiredate?: number;
  message: string;
  uniquehash: string;
  dateissued: number;
  email: string;
  badgeurl: string;
};
