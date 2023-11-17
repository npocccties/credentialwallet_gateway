import { withIronSessionApiRoute } from "iron-session/next";

import handler from "./handler";

import { sessionOptions } from "@/lib/session";

export default withIronSessionApiRoute(handler, sessionOptions);
