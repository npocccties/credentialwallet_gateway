import type { NextApiRequest, NextApiResponse } from "next";
import prisma, { Prisma } from "@/lib/prisma";

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
  // const perPage = 10;
  // const skip = perPage * (req.body.page - 1);

  const [data, dataCount] = await Promise.all([
    prisma.badge_vcs.findMany({
      // take: 5,
      skip: 1,
      orderBy: {
        badge_issuedon: "desc",
      },
    }),
    prisma.badge_vcs.count({
      where: {
        mywallet_id: req.body.nywallet_id,
      },
    }),
  ]);
  // const data = {};
  console.log("data", data);

  res.status(200).json({
    badgeVcList: data,
    dataCount: dataCount,
  });
}
