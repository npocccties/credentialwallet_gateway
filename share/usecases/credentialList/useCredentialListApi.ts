import axios, { AxiosPromise, AxiosResponse } from "axios";

import { api } from "../api";

import { CredentialList } from "@/types/api/credential";

type CredentialListApiResponse = {
  data: CredentialList;
};

export const useCredentialListApi = async () => {
  const apiPath = api.v1.credential.list;

  const res = await axios.get<CredentialListApiResponse>(apiPath);

  return res.data;
};
