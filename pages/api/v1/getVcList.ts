import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";
import { BadgeList } from "@/types/data";

export default async function handler(req: NextApiRequest, res: NextApiResponse<BadgeList>) {
  // const perPage = 10;
  // const skip = perPage * (req.body.page - 1);

  const [data, dataCount] = await Promise.all([
    prisma.badgeVc.findMany({
      // take: 5,
      skip: 1,
      orderBy: {
        badgeIssuedon: "desc",
      },
    }),
    prisma.badgeVc.count({
      where: {
        mywalletId: req.body.mywallet_id,
      },
    }),
  ]);
  // const data = {};
  console.log("data", data);

  res.status(200).json({
    badgeList: {
      badgeVcList: data,
      dataCount: dataCount,
    },
  });
}
