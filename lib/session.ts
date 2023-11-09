import type { IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
  password: process.env.session_password,
  cookieName: "chilowallet",
  cookieOptions: {
    secure: true,
  },
};

declare module "iron-session" {
  interface IronSessionData {
    eppn: string;
  }
}
