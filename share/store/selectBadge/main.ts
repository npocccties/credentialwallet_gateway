import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

import { SelectBadgeState, SelectBadgeGetters, SelectBadgeActions } from "./types";

import { RECOIL_ATOMS_KEYS } from "@/share/store/keys";

const selectBadgeState = atom<SelectBadgeState>({
  key: RECOIL_ATOMS_KEYS.SELECT_BADGE_STATE,
  default: {
    email: "",
    uniquehash: "",
    lmsId: 0,
    lmsName: "",
  },
});

const useSelectBadgeData = () => {
  return useRecoilValue(selectBadgeState);
};

export const selectBadgeGetters: SelectBadgeGetters = {
  useSelectBadgeData,
};

const useSetSelectBadge = () => {
  const setState = useSetRecoilState(selectBadgeState);

  const setSelectBadge = useCallback(
    (params: SelectBadgeState) => {
      const { email, uniquehash, lmsId: lmsId, lmsName } = params;
      setState(() => {
        return {
          email: email,
          uniquehash: uniquehash,
          lmsId: lmsId,
          lmsName: lmsName,
        };
      });
    },
    [setState],
  );

  return { setSelectBadge };
};

export const selectBadgeActions: SelectBadgeActions = {
  useSetSelectBadge,
};
