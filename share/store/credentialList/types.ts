import { CredentialList } from "@/types/api/credential";

export type CredentialListState = CredentialList;

export type CredentialListGetters = {
  useCredentialList: () => CredentialListState;
};

export type CredentialListActions = {
  useFetchCredentialList: () => {
    fetchCredentialList: () => void;
  };
  // useSetBadgeVc: () => {
  //   setBadge: (badge: BadgeVcs) => void;
  // };
};
