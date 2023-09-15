import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.wallets.upsert({
    where: { wallet_id: 2 },
    update: {},
    create: {
      orthros_id: "test-333333-2222",
    },
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
