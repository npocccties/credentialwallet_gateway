import { api } from "../api";

import { axiosClient } from "@/lib/axios";

export const useDeleteCredentialApi = async (badgeVcId: number) => {
  const apiPath = api.v1.credential.delete;
  const deleteVcId = badgeVcId.toString();

  await axiosClient.post(`${apiPath}/${deleteVcId}`);
};
