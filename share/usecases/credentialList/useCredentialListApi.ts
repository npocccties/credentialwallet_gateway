import axios from "axios";

import { api } from "../api";

import { CredentialList, SearchFormItem } from "@/types/api/credential";

type CredentialListApiResponse = {
  data: CredentialList;
};

export const useCredentialListApi = async () => {
  const apiPath = api.v1.credential.list;

  const res = await axios.get<CredentialListApiResponse>(apiPath);

  return res.data;
};

export const useSearchCredentialListApi = async (param: SearchFormItem) => {
  const apiPath = api.v1.credential.list;
  const { badgeName, issuedFrom, issuedTo, sortOrder } = param;

  const res = await axios.get<CredentialListApiResponse>(
    `${apiPath}?badgeName=${badgeName}&issuedFrom=${issuedFrom}&issuedTo=${issuedTo}&sortOrder=${sortOrder}`,
  );

  return res.data;
};
