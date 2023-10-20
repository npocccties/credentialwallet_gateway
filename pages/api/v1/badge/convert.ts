import type { NextApiRequest, NextApiResponse } from "next";

import { getBadgeClassById, setOpenBadgeMetadataToImage, validateOpenBadge } from "@/lib/openbadge";
import { Session, withSession } from "@/lib/session";
import { getRequestFromVCRequest, calcPinhash, VCData } from "@/lib/utils";
import { issue } from "@/services/issue.service";
import { issueRequest } from "@/services/issueRequest.service";
import { getManifest } from "@/services/manifest.service";
import { verifyVcRequest } from "@/services/verifyVcReqest.service";
import { BadgeMetaData } from "@/types/badgeInfo/metaData";

type RequestBody = {
  uniquehash: string;
  email: string;
  badgeMetaData: BadgeMetaData;
};

export default async function handler(req: NextApiRequest & Session, res: NextApiResponse) {
  const { uniquehash, email, badgeMetaData }: RequestBody = req.body;
  console.log(`### start getMyOpenBadge uniquehash=${uniquehash} email=${email} ####`);

  const result = await validateOpenBadge(email, badgeMetaData);
  if (!result) {
    throw new Error("OpenBadge invalid");
  }
  const { image } = badgeMetaData.badge;
  // image : "data:image/png;base64,iVBORw0KGg..."; // base64エンコードされた画像データ
  const base64ImageWithoutPrefix = image.split(",")[1];

  const openBadgeImage = await setOpenBadgeMetadataToImage(base64ImageWithoutPrefix, badgeMetaData);

  const manifestURL =
    "https://verifiedid.did.msidentity.com/v1.0/tenants/02aedfa8-e2e6-4a52-b553-fe70806bf35c/verifiableCredentials/contracts/a014522a-d245-b4ac-08a7-600dec4ab709/manifest";
  await withSession(req, res);
  const badgeClass = await getBadgeClassById(badgeMetaData.badge.id);
  const verificationURL = badgeMetaData.verify.url;

  const { pin, url, sessionId } = await issueRequest(
    manifestURL,
    badgeClass,
    verificationURL,
    email,
    req.session.id,
    openBadgeImage,
    badgeMetaData.issuedOn.toString(),
    badgeMetaData.expires.toString(),
  );

  if (!url) {
    throw new Error("not url");
  }

  // 受け取ったvcRequestUrlをもとに、発行リクエストを検証
  const vcRequestInJwt = await verifyVcRequest(url);

  const { vcRequest } = getRequestFromVCRequest(vcRequestInJwt);

  const manifest = await getManifest(manifestURL);
  const acquiredAttestation = {};

  if (vcRequest.id_token_hint) {
    acquiredAttestation["idTokens"] = { "https://self-issued.me": vcRequest.id_token_hint };
  }

  let vcData: VCData;
  try {
    const pinhash = await calcPinhash(pin.toString(), vcRequest.pin.salt);
    vcData = await issue(vcRequest, manifest, acquiredAttestation, { pin: pinhash });
  } catch (e) {
    console.error(e.message);
  }

  // TODO: 保存処理の実装
  // await saveBadgeVc({});

  res.status(200).json({});
}
