import { api } from "../api";

import { axiosClient } from "@/lib/axios";

export const useLogoutApi = async () => {
  const apiPath = api.v1.logout;

  await axiosClient.post(apiPath);
};
