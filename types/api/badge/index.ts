import { IfBadgeInfo } from "@/types/BadgeInfo";

export type BadgeListReqestParam = {
  username: string;
  isNeedSSO: boolean;
  moodleUrl: string;
  password?: string;
};

export type BadgeList = IfBadgeInfo[];
