import axios from "axios";

import { api } from "../api";

export const useDeleteCredentialApi = async (badgeVcId: number) => {
  const apiPath = api.v1.credential.delete;
  const deleteVcId = badgeVcId.toString();

  try {
    if (!deleteVcId) throw new Error("削除するバッジのIDが指定されていません");

    await axios.post(`${apiPath}?badgeVcId=${deleteVcId}`);
  } catch (e) {
    throw new Error(e);
  }
};
