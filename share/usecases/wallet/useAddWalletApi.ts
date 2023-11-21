import { api } from "../api";

import { axiosClient } from "@/lib/axios";

export const useAddWalletApi = async () => {
  const apiPath = api.v1.entry;

  await axiosClient.post(apiPath);
};
