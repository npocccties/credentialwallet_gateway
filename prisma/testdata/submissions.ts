import { faker } from "@faker-js/faker";
import { Submission } from "@prisma/client";
import { dateToJtc } from "./badge_vcs";

export const submissionsTestData: Submission[] = [
  {
    badgeVcId: 1,
    myWalletId: 1,
    submitedAt: dateToJtc(faker.date.anytime()),
    submissionEmail: "aaa@example.com",
    customerId: 1,
    customerName: "大阪市",
  },
  {
    badgeVcId: 1,
    myWalletId: 1,
    submitedAt: dateToJtc(faker.date.anytime()),
    submissionEmail: "aaa@example.com",
    customerId: 2,
    customerName: "大阪府",
  },
  {
    badgeVcId: 1,
    myWalletId: 1,
    submitedAt: dateToJtc(faker.date.anytime()),
    submissionEmail: "aaa@example.com",
    customerId: 3,
    customerName: "堺市",
  },
  {
    badgeVcId: 1,
    myWalletId: 1,
    submitedAt: dateToJtc(faker.date.anytime()),
    submissionEmail: "aaa@example.com",
    customerId: 4,
    customerName: "大阪市大学連合",
  },
  {
    badgeVcId: 2,
    myWalletId: 1,
    submitedAt: dateToJtc(faker.date.anytime()),
    submissionEmail: "aaa@example.com",
    customerId: 1,
    customerName: "大阪市",
  },
  {
    badgeVcId: 2,
    myWalletId: 1,
    submitedAt: dateToJtc(faker.date.anytime()),
    submissionEmail: "aaa@example.com",
    customerId: 3,
    customerName: "堺市",
  },
];
