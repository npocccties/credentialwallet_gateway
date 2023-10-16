import axios from "axios";

import { api } from "../api";

import { CredentialDetailState } from "@/share/store/credentialDetail/types";

export const useCredentialDetailApi = async (vcId: string) => {
  const apiPath = api.v1.credential.detail;

  if (!vcId) return { data: undefined };

  const { data } = await axios.get<CredentialDetailState>(`${apiPath}?badge_vc_id=${vcId}`);
  console.log("api", data);

  return { data };
};
