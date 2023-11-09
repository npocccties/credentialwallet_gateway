import { userWalletId } from "../repository/wallet";

export const getWalletId = async (eppn: string) => {
  const walletId = await userWalletId(eppn);
  return walletId;
};
