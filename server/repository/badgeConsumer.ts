import prisma from "@/lib/prisma";

export const findCabinetUrl = async ({ consumerId }: { consumerId: number }) => {
  const cabinetUrl = await prisma.badgeConsumer.findUnique({
    select: {
      cabinetUrl: true,
    },
    where: {
      consumerId: consumerId,
    },
  });

  return cabinetUrl;
};
