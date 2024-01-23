import ION from "@decentralized-identity/ion-tools";
import axios from "axios";

import { loggerDebug, loggerError } from "@/lib/logger";
import { retryRequest } from "@/lib/retryRequest";
import { getRequestUrlFromUrlMessage, getProtectedHeaderFromVCRequest } from "@/lib/utils";

export const verifyVcRequest = async (vcRequestUrl: string) => {
  const requestUrl = getRequestUrlFromUrlMessage(vcRequestUrl);

  loggerDebug("verifyVcRequest requestUrl", requestUrl);

  let vcRequestInJwt = "";
  let vcRequestVerified = "";
  try {
    vcRequestInJwt = await retryRequest(async () => {
      return axios.get(requestUrl).then((res) => res.data);
    });
    const header = getProtectedHeaderFromVCRequest(vcRequestInJwt);
    const issDIDDocument = await ION.resolve(header.kid);
    vcRequestVerified = await ION.verifyJws({
      jws: vcRequestInJwt,
      publicJwk: issDIDDocument.didDocument.verificationMethod[0].publicKeyJwk,
    });
    loggerDebug("vcRequestVerified", vcRequestVerified);
  } catch (e) {
    loggerError("failed to verifyVcRequest", e);
    throw new Error("verify error", e);
  }

  return vcRequestInJwt;
};
