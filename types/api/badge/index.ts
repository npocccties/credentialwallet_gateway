import { IfBadgeInfo } from "@/types/BadgeInfo";
import { BadgeMetaData } from "@/types/badgeInfo/metaData";

export type BadgeListReqestParam = {
  username: string;
  lmsId: number;
  password?: string;
};

export type BadgeMetaDataReqestParam = {
  lmsUrl: string;
  uniquehash: string;
};

export type BadgeList = IfBadgeInfo[];

export type BadgeImportRequestParam = {
  uniquehash: string;
  email: string;
  badgeMetaData: BadgeMetaData;
  lmsId: number;
  lmsName: string;
};
