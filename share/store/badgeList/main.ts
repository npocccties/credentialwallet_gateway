import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

import { BadgeListActions, BadgeListGetters, BadgeListState } from "@/share/store/badgeList/types";
import { RECOIL_ATOMS_KEYS } from "@/share/store/keys";
import { useBadgeListApi } from "@/share/usecases/badgeList/useBadgeListApi";
import { BadgeListReqestParam } from "@/types/api/badge";

const defaultState: BadgeListState = [];

const badgeListState = atom<BadgeListState>({
  key: RECOIL_ATOMS_KEYS.BADGE_LIST_STATE,
  default: defaultState,
});

const useBadgeList = () => {
  return useRecoilValue(badgeListState);
};

export const badgeListGetters: BadgeListGetters = {
  useBadgeList,
};

const useFetchBadgeList = () => {
  const setState = useSetRecoilState(badgeListState);

  const fetchBadgeList = useCallback(
    async (param: BadgeListReqestParam) => {
      const { badgeList } = await useBadgeListApi(param);
      setState(() => {
        if (!badgeList) {
          return defaultState;
        }
        return badgeList;
      });
    },
    [setState],
  );

  return { fetchBadgeList };
};

export const badgeListActions: BadgeListActions = {
  useFetchBadgeList,
};
