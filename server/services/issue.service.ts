import axios from "axios";

import { loggerDebug } from "@/lib/logger";
import { retryRequest } from "@/lib/retryRequest";
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
  const key = process.env.private_key_jwk;
  const keyObj: KeyPair = JSON.parse(key);

  const signer = new Signer();
  await signer.init(keyObj);

  loggerDebug("wallet did", signer.did);

  let attestations: any = { ...acquiredIdToken };

  const issueRequestIdToken = await signer.siop({
    aud: manifest.input.credentialIssuer,
    contract: manifest.display.contract,
    attestations,
    pin: options?.pin,
  });

  loggerDebug("issue request id token", issueRequestIdToken);

  const vc = await retryRequest(async () => {
    const issueResponse = await axios.post<string, IIssueResponse>(
      manifest.input.credentialIssuer,
      issueRequestIdToken,
      {
        headers: { "Content-Type": "text/plain" },
      },
    );
    return issueResponse.data.vc;
  });

  await axios.post(vcRequest.redirect_uri ? vcRequest.redirect_uri : vcRequest.client_id, {
    state: vcRequest.state,
    code: "issuance_successful",
  });

  return vc;
};
