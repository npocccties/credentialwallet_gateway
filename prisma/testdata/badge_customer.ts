import { BadgeCustomer } from "@prisma/client";

export const badgeCustomerTestData: BadgeCustomer[] = [
  {
    customerId: 1,
    customerName: "大阪市",
    cabinetUrl: "https://xxx.com",
  },
  {
    customerId: 2,
    customerName: "大阪府",
    cabinetUrl: "https://yyy.com",
  },
  {
    customerId: 3,
    customerName: "堺市",
    cabinetUrl: "https://zzz.com",
  },
  {
    customerId: 4,
    customerName: "大阪市大学連合",
    cabinetUrl: "https://rrr.com",
  },
  {
    customerId: 5,
    customerName: "奈良市教育委員会",
    cabinetUrl: "https://nnn.com",
  },
];
