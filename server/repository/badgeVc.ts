import prisma, { Prisma } from "@/lib/prisma";

export const saveBadgeVc = async (input: Prisma.BadgeVcCreateInput) => {
  try {
    await prisma.badgeVc.create({
      data: input,
    });
  } catch (e) {
    console.log(e.message);
    throw new Error(e);
  }
};
