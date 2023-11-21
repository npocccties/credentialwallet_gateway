import jsonwebtoken from "jsonwebtoken";

import { loggerInfo } from "./logger";

type UserInfo = {
  eppn: string;
  name: string;
};

export const getUserInfoFormJwt = (jwt: string): UserInfo => {
  try {
    const decodeJwt = <UserInfo>jsonwebtoken.decode(jwt);

    loggerInfo("decodeJwt", decodeJwt);

    if (!decodeJwt) {
      return { eppn: null, name: null };
    }

    return decodeJwt;
  } catch {
    return { eppn: null, name: null };
  }
};
