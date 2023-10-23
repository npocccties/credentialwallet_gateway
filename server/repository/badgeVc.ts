import prisma, { Prisma } from "@/lib/prisma";
import { VCData } from "@/lib/utils";
import { BadgeMetaData } from "@/types/badgeInfo/metaData";

type CreateData = {
  walletId: number;
  badgeMetaData: BadgeMetaData;
  uniquehash: string;
  badgeEmail: string;
  vcData: VCData;
  selectLms: { id: number; name: string };
};

export const saveBadgeVc = async ({
  walletId,
  badgeMetaData,
  uniquehash,
  badgeEmail,
  vcData,
  selectLms,
}: CreateData) => {
  const input: Prisma.BadgeVcCreateInput = {
    wallets: {
      connect: {
        walletId: walletId,
      },
    },
    lmsId: selectLms.id,
    lmsName: selectLms.name,
    badgeUniquehash: uniquehash,
    badgeName: badgeMetaData.badge.name,
    badgeEarnerEmail: badgeEmail,
    badgeClassId: badgeMetaData.badge.id,
    badgeIssuerName: badgeMetaData.badge.issuer.name,
    badgeIssuedon: badgeMetaData.issuedOn,
    badgeExpires: badgeMetaData.expires,
    vcDataHeader: "",
    vcDataPayload: JSON.stringify(vcData),
    vcDataSignature: "",
  };
  await prisma.badgeVc.create({
    data: input,
  });
};
