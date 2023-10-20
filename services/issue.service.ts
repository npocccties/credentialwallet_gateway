import axios from "axios";

import { initKeyPair2 } from "@/lib/repository/keyPair";
import { Signer } from "@/lib/signer";
import { decodeJWTToVCData, VCData } from "@/lib/utils";
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
): Promise<VCData> => {
  // TODO: 仮のデータ
  const password = "1456";
  const key = await initKeyPair2(password);

  const signer = new Signer();
  await signer.init(key);

  let attestations: any = { ...acquiredIdToken };

  const issueRequestIdToken = await signer.siop({
    aud: manifest.input.credentialIssuer,
    contract: manifest.display.contract,
    attestations,
    pin: options?.pin,
  });
  console.log("issueRequestIdToken", issueRequestIdToken);

  const issueResponse = await axios.post<string, IIssueResponse>(manifest.input.credentialIssuer, issueRequestIdToken, {
    headers: { "Content-Type": "text/plain" },
  });
  const vc = issueResponse.data.vc;
  const vcDecodedData = decodeJWTToVCData(vc);
  console.log("length", vc.length);

  await axios.post(vcRequest.redirect_uri ? vcRequest.redirect_uri : vcRequest.client_id, {
    state: vcRequest.state,
    code: "issuance_successful",
  });

  return vcDecodedData;
};
