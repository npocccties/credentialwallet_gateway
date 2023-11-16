import prisma from "@/lib/prisma";

export const submissionBadge = async ({ badgeVcId }: { badgeVcId: number }) => {
  const [badgeVc, badgeConsumers] = await Promise.all([
    prisma.badgeVc.findUnique({
      select: {
        badgeVcId: true,
        vcDataPayload: true,
      },
      where: {
        badgeVcId: badgeVcId,
      },
    }),
    prisma.badgeConsumer.findMany(),
  ]);

  return { badgeVc, badgeConsumers };
};
