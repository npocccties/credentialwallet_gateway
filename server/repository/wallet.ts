import { loggerError } from "@/lib/logger";
import prisma from "@/lib/prisma";

export const userWalletId = async (id: string) => {
  try {
    const { walletId } = await prisma.wallet.findUnique({
      select: {
        walletId: true,
      },
      where: {
        orthrosId: id,
      },
    });

    return walletId;
  } catch (e) {
    loggerError("failed to userWalletId", e.message);
    throw e;
  }
};
