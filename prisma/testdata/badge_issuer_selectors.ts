import { badgeIssuerSelector } from "@prisma/client";

export const badgeIssuerSelectorTestData: badgeIssuerSelector[] = [
  {
    badgeIssuerSelectorId: 1,
    badgeIssuerSelectorName: "大阪教育大学",
    badgeIssueUrl: "https://z.cccties.org/41a",
    ssoEnable: false,
  },
  {
    badgeIssuerSelectorId: 2,
    badgeIssuerSelectorName: "大阪○○大学",
    badgeIssueUrl: "https://xxxx/yyyy",
    ssoEnable: true,
  },
  {
    badgeIssuerSelectorId: 3,
    badgeIssuerSelectorName: "関西○○大学",
    badgeIssueUrl: "https://zzzz/aaaa",
    ssoEnable: true,
  },
  {
    badgeIssuerSelectorId: 4,
    badgeIssuerSelectorName: "京都××大学",
    badgeIssueUrl: "https://kkkk/yyyy",
    ssoEnable: true,
  },
];
