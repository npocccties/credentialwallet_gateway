import { VcDetailData } from "@/types/api/credential/detail";

export type VcDetailState = VcDetailData | {};

export type VcDetailGetters = {
  useVcDetail: () => VcDetailState;
};

export type VcDetailActions = {
  useSetVcDetail: () => {
    setVcDetail: (vcDetailData: VcDetailData) => void;
  };
  useDeleteCredential: () => { deleteCredential: (badgeVcId: number) => void };
};
