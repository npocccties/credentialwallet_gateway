import jsonwebtoken from "jsonwebtoken";

type UserInfo = {
  eppn: string;
  displayName: string;
};

export const getUserInfoFormJwt = (jwt: string): UserInfo => {
  try {
    const decodeJwt = <UserInfo>jsonwebtoken.decode(jwt);

    if (!decodeJwt) {
      return { eppn: null, displayName: null };
    }

    return decodeJwt;
  } catch {
    return { eppn: null, displayName: null };
  }
};
