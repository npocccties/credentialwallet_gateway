import { CredentialDetail } from "@/types/api/credential/detail";

export type CredentialDetailState = CredentialDetail;

export type CredentialDetailGetters = {
  useCredentialDetail: () => CredentialDetailState;
};

export type CredentialDetailActions = {
  useFetchCredentialDetail: () => {
    fetchCredentialDetail: (vsId: string) => void;
  };
};
