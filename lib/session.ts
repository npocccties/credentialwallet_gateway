import type { IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
  password: process.env.session_password,
  cookieName: "chilowallet",
  cookieOptions: {
    // TODO: 開発環境用
    secure: true,
  },
};

declare module "iron-session" {
  interface IronSessionData {
    eppn: string;
  }
}
