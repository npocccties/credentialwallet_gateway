import { api } from "../api";

import { axiosClient } from "@/lib/axios";

type RequestParam = {
  orthrosId: string;
};

export const useAddWalletApi = async ({ orthrosId }: RequestParam) => {
  const apiPath = api.v1.wallet.add;

  await axiosClient.post(apiPath, { orthrosId });
};
