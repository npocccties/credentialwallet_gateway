import { LmsList } from "@prisma/client";

export const lmsListTestData: LmsList[] = [
  {
    lmsId: 1,
    lmsName: "大阪教育大学",
    lmsUrl: "https://z.cccties.org/41a",
    ssoEnable: false,
  },
  {
    lmsId: 2,
    lmsName: "大阪○○大学",
    lmsUrl: "https://xxxx/yyyy",
    ssoEnable: true,
  },
  {
    lmsId: 3,
    lmsName: "関西○○大学",
    lmsUrl: "https://zzzz/aaaa",
    ssoEnable: true,
  },
  {
    lmsId: 4,
    lmsName: "京都××大学",
    lmsUrl: "https://kkkk/yyyy",
    ssoEnable: true,
  },
];
