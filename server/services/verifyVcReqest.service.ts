import ION from "@decentralized-identity/ion-tools";
import axios from "axios";

import { getRequestUrlFromUrlMessage, getProtectedHeaderFromVCRequest } from "@/lib/utils";

export const verifyVcRequest = async (vcRequestUrl: string) => {
  const requestUrl = getRequestUrlFromUrlMessage(vcRequestUrl);

  let vcRequestInJwt = "";
  let vcRequestVerified = "";
  try {
    vcRequestInJwt = await axios.get(requestUrl).then((res) => res.data);
    const header = getProtectedHeaderFromVCRequest(vcRequestInJwt);
    const issDIDDocument = await ION.resolve(header.kid);
    vcRequestVerified = await ION.verifyJws({
      jws: vcRequestInJwt,
      publicJwk: issDIDDocument.didDocument.verificationMethod[0].publicKeyJwk,
    });
    console.log("vcRequestVerified", vcRequestVerified);
  } catch (e) {
    console.log("error", e);
    throw new Error("verify error", e);
  }

  return vcRequestInJwt;
};
