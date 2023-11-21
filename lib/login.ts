import { jwtVerify } from "jose/jwt/verify";
import { importSPKI } from "jose/key/import";
import jsonwebtoken from "jsonwebtoken";

type UserInfo = {
  eppn: string;
  name: string;
};

const pubKey = process.env.orthros_login_key_base64;

export const getUserInfoFormJwt = (jwt: string) => {
  const decodeJwt = <UserInfo>jsonwebtoken.decode(jwt);

  const { eppn, name } = decodeJwt;

  return { eppn, name };
};

export const verifyOrthrosJwt = async (jwt: string) => {
  console.log("pubKey", pubKey);
  const publicKey = Buffer.from(pubKey, "base64").toString();
  const cryptKey = await importSPKI(publicKey, "RS256");

  try {
    jwtVerify(jwt, cryptKey, { algorithms: ["RS256"] });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
