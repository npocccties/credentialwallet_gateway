import { api } from "../api";

import { axiosClient } from "@/lib/axios";
import { CredentialList, SearchFormItem } from "@/types/api/credential";

export const useCredentialListApi = async () => {
  const apiPath = api.v1.credential.list;
  const defaultSort = "desk";

  const res = await axiosClient.get<CredentialList>(`${apiPath}?sortOrder=${defaultSort}`);

  return res.data;
};

export const useSearchCredentialListApi = async (param: SearchFormItem) => {
  const apiPath = api.v1.credential.list;
  const { badgeName, issuedFrom, issuedTo, sortOrder } = param;

  const res = await axiosClient.get<CredentialList>(
    `${apiPath}?badgeName=${badgeName}&issuedFrom=${issuedFrom}&issuedTo=${issuedTo}&sortOrder=${sortOrder}`,
  );

  return res.data;
};
