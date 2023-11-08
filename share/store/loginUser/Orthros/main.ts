import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

import { OrthrosUserState, OrthrosUserGetters, OrthrosUserActions } from "./types";

import { RECOIL_ATOMS_KEYS } from "@/share/store/keys";

const { persistAtom } = recoilPersist({
  key: "loginUser",
  storage: typeof window === "undefined" ? undefined : sessionStorage,
});

const orthrosUserState = atom<OrthrosUserState>({
  key: RECOIL_ATOMS_KEYS.ORTHROS_USER_STATE,
  default: {
    eppn: "",
    displayName: "",
  },
  effects_UNSTABLE: [persistAtom],
});

const useOrthrosUserData = () => {
  return useRecoilValue(orthrosUserState);
};

export const orthrosUserGetters: OrthrosUserGetters = {
  useOrthrosUserData,
};

const useSetOrthrosUser = () => {
  const setState = useSetRecoilState(orthrosUserState);

  const setOrthrosUser = useCallback(
    (params: OrthrosUserState) => {
      const { eppn, displayName } = params;
      setState(() => {
        return {
          eppn: eppn,
          displayName: displayName,
        };
      });
    },
    [setState],
  );

  return { setOrthrosUser };
};

export const orthrosUserActions: OrthrosUserActions = {
  useSetOrthrosUser,
};
