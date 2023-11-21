import { jwtVerify } from "jose/jwt/verify";
import { importSPKI } from "jose/key/import";
import jsonwebtoken from "jsonwebtoken";

import { loggerError, loggerMWError, loggerMWInfo } from "./logger";

type UserInfo = {
  eppn: string;
  name: string;
};

const pubKey = process.env.orthros_login_key_base64;

export const getUserInfoFormJwt = (jwt: string): UserInfo => {
  try {
    const decodeJwt = <UserInfo>jsonwebtoken.decode(jwt);

    console.log("decodeJwt", decodeJwt);

    if (!decodeJwt) {
      return { eppn: null, name: null };
    }

    return decodeJwt;
  } catch {
    return { eppn: null, name: null };
  }
};

export const verifyOrthrosJwt = async (jwt: string) => {
  const cryptKey = await getCryptKey();

  try {
    const result = await jwtVerify(jwt, cryptKey, { algorithms: ["RS256"] });

    loggerMWInfo("verifyResult------------", JSON.stringify(result));

    return true;
  } catch (e) {
    loggerMWError("error! invalid jwt", e);
    return false;
  }
};

const getCryptKey = async () => {
  try {
    const publicKey = Buffer.from(pubKey, "base64").toString();
    const cryptKey = await importSPKI(publicKey, "RS256");

    return cryptKey;
  } catch (e) {
    loggerError("error! get public key", e);
  }
};
