import { LmsList } from "@prisma/client";

export const lmsListTestData: LmsList[] = [
  {
    lmsId: 1,
    lmsName: "大阪教育大学",
    lmsUrl: "https://z.cccties.org/41a",
    ssoEnabled: false,
    lmsAccessToken: "",
    lmsServuce: "",
  },
  {
    lmsId: 2,
    lmsName: "大阪○○大学",
    lmsUrl: "https://xxxx/yyyy",
    ssoEnabled: true,
    lmsAccessToken: "v721b60a05b20d1083594c14166dd0a9c",
    lmsServuce: "moodle_mobile_app",
  },
  {
    lmsId: 3,
    lmsName: "関西○○大学",
    lmsUrl: "https://zzzz/aaaa",
    ssoEnabled: true,
    lmsAccessToken: "v721b60a05b20d1083594c14166dd0a9c",
    lmsServuce: "moodle_mobile_app",
  },
  {
    lmsId: 4,
    lmsName: "京都××大学",
    lmsUrl: "https://kkkk/yyyy",
    ssoEnabled: true,
    lmsAccessToken: "v721b60a05b20d1083594c14166dd0a9c",
    lmsServuce: "moodle_mobile_app",
  },
];
