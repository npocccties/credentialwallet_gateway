import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

import {
  CredentialDetailActions,
  CredentialDetailGetters,
  CredentialDetailState,
} from "@/share/store/credentialDetail/types";
import { RECOIL_ATOMS_KEYS } from "@/share/store/keys";
import { useCredentialDetailApi } from "@/share/usecases/credentialDetail/useCredentialDetailApi";
import { CredentialDetail } from "@/types/api/credential/detail";

const defaultValue: CredentialDetail = {
  vcDetaildata: {
    badgeVcId: 0,
    badgeName: "",
    badgeEmail: "",
    badgeIssuerName: "",
    badgeIssuedon: "",
    badgeExpires: "",
    vcDataPayload: "",
    courseUrl: "",
    submissions: [],
  },
  knowledgeBadges: [],
  submissionsHistories: [],
  badgeExportData: "",
};

const credentialDetailState = atom<CredentialDetailState>({
  key: RECOIL_ATOMS_KEYS.CREDENTIAL_DETAIL_STATE,
  default: defaultValue,
});

const useCredentialDetail = () => {
  return useRecoilValue(credentialDetailState);
};

export const credentialDetailGetters: CredentialDetailGetters = {
  useCredentialDetail,
};

/**  credentialDetail の fetch */
const useFetchCredentialDetail = () => {
  const setState = useSetRecoilState(credentialDetailState);

  const fetchCredentialDetail = useCallback(
    async (vcId: string) => {
      const { data } = await useCredentialDetailApi(vcId);
      setState(() => {
        if (!data) {
          return defaultValue;
        }
        return data;
      });
    },
    [setState],
  );

  return { fetchCredentialDetail };
};

export const credentialDetailActions: CredentialDetailActions = {
  useFetchCredentialDetail,
};
