import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

type Data = {
  data: {
    image: string;
    name: string;
    category: string;
    issuer: string;
    issuedate: string;
  }[];
  totalPages: number;
  currentPage: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const data = await prisma.badge_vcs.findMany({
    take: 3,
    skip: 1,
    orderBy: {
      badge_issuedon: "desc",
    },
  });
  // const data = {};
  console.log("data", data);

  res.status(200).json({
    data: data,
  });
}
