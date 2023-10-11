import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

import { CredentialListActions, CredentialListGetters, CredentialListState } from "@/share/store/credentialList/types";
import { RECOIL_ATOMS_KEYS } from "@/share/store/keys";
import { useCredentialListApi } from "@/share/usecases/credentialList/useCredentialListApi";

const defaultState: CredentialListState = {
  badgeVcList: [],
  submissionsAll: {
    totalSubmission: 0,
    detailSubmissions: [],
  },
  totalBadgeCount: 0,
};

// state はそのまま export しない
const credentialListState = atom<CredentialListState>({
  key: RECOIL_ATOMS_KEYS.CREDENTIAL_LIST_STATE,
  default: defaultState,
});

// Getter的役割
const useCredentialList = () => {
  return useRecoilValue(credentialListState);
};

export const credentialListGetters: CredentialListGetters = {
  useCredentialList,
};

// Action をカスタムフックとして定義
/**  credentialList の fetch */
const useFetchCredentialList = () => {
  const setState = useSetRecoilState(credentialListState);

  const fetchCredentialList = useCallback(async () => {
    const { data } = await useCredentialListApi();
    setState(() => {
      if (!data) {
        return defaultState;
      }
      return data;
    });
  }, [setState]);

  return { fetchCredentialList };
};

// /** Badgeを追加 */
// const useSetBadgeVc = () => {
//   const setState = useSetRecoilState(badgeListState);

//   // 引数がある場合は、useCallbackの第一引数へ記述
//   const setBadge = useCallback(
//     (badge: BadgeVcs) => {
//       setState((prev) => {
//         return {
//           badgeList: {
//             badgeVcList: [...prev.badgeList.badgeVcList, badge],
//           },
//         };
//       });
//     },
//     [setState]
//   );

//   return { setBadge };
// };

export const credentialListActions: CredentialListActions = {
  useFetchCredentialList,
  // useSetBadgeVc,
};
