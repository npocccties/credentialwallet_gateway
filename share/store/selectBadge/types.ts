export type SelectBadgeState = {
  email: string;
  uniquehash: string;
  lmsId: number;
  lmsName: string;
};

export type SelectBadgeGetters = {
  useSelectBadgeData: () => SelectBadgeState;
};

export type SelectBadgeActions = {
  useSetSelectBadge: () => {
    setSelectBadge: (params: SelectBadgeState) => void;
  };
};
