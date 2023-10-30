import ION from "@decentralized-identity/ion-tools";
import axios from "axios";

import { KeyPair, Signer } from "@/lib/signer";
import { AcquiredIdToken, Manifest, VCRequest } from "@/types";

interface IIssueResponse {
  data: {
    vc: string;
  };
}

export const issue = async (
  vcRequest: VCRequest,
  manifest: Manifest,
  acquiredIdToken: AcquiredIdToken,
  options?: { [key: string]: any },
): Promise<string> => {
  // TODO: subのdidをどう作成するかを考える
  const key: KeyPair = await ION.generateKeyPair();

  const signer = new Signer();
  await signer.init(key);

  let attestations: any = { ...acquiredIdToken };

  const issueRequestIdToken = await signer.siop({
    aud: manifest.input.credentialIssuer,
    contract: manifest.display.contract,
    attestations,
    pin: options?.pin,
  });

  const issueResponse = await axios.post<string, IIssueResponse>(manifest.input.credentialIssuer, issueRequestIdToken, {
    headers: { "Content-Type": "text/plain" },
  });
  const vc = issueResponse.data.vc;

  await axios.post(vcRequest.redirect_uri ? vcRequest.redirect_uri : vcRequest.client_id, {
    state: vcRequest.state,
    code: "issuance_successful",
  });

  return vc;
};
