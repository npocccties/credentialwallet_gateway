import prisma from "@/lib/prisma";

export const findAllLmsList = async () => {
  return await prisma.lmsList.findMany({
    orderBy: {
      lmsId: "asc",
    },
  });
};
