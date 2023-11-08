export type OrthrosUserState = {
  eppn: string;
  displayName: string;
};

export type OrthrosUserGetters = {
  useOrthrosUserData: () => OrthrosUserState;
};

export type OrthrosUserActions = {
  useSetOrthrosUser: () => {
    setOrthrosUser: (params: OrthrosUserState) => void;
  };
};
