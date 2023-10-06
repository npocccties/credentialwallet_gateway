import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

import { badgeVcsTestData } from "./testdata/badge_vcs";

const prisma = new PrismaClient();

async function main() {
  // テストデータの挿入;
  for (let i = 0; i < 10; i++) {
    await prisma.myWallets.create({
      data: {
        mywalletId: i,
        orthrosId: faker.string.uuid(),
        createTime: faker.date.anytime(),
      },
    });
  }
  await prisma.badgeVc.createMany({
    data: badgeVcsTestData,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
