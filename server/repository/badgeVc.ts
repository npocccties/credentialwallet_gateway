import { loggerError } from "@/lib/logger";
import prisma, { Prisma } from "@/lib/prisma";

export const saveBadgeVc = async (input: Prisma.BadgeVcCreateInput) => {
  try {
    await prisma.badgeVc.create({
      data: input,
    });
  } catch (e) {
    loggerError("failed to saveBadgeVc", e.message);
    throw e;
  }
};
