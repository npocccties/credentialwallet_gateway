import { getIronSession } from "iron-session/edge";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import { logEndForOther, logStartForOther } from "@/constants/log";
import { loggerMWInfo } from "@/lib/logger";

export async function middleware(req: NextRequest) {
  loggerMWInfo(logStartForOther("middleware"));
  const res = NextResponse.next();
  const url = req.nextUrl;
  loggerMWInfo(`access path ${url.pathname}`);

  if (url.pathname === "/") {
    loggerMWInfo(logEndForOther("middleware access path '/'"));
    return res;
  }

  // ルート直下以外にアクセス時、sessionにeppnがなければルートにリダイレクトする
  const session = await getIronSession(req, res, {
    cookieName: "chilowallet",
    password: process.env.session_password,
    cookieOptions: {
      secure: true,
    },
  });

  const { eppn } = session;

  if (!eppn) {
    loggerMWInfo("not session! redirect '/'");
    return NextResponse.redirect(new URL("/", req.url));
  }

  loggerMWInfo(logEndForOther("middleware"));
  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
