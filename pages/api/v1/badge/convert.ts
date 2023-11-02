import type { NextApiRequest, NextApiResponse } from "next";

import { errors } from "@/constants/error";
import { Session, withSession } from "@/lib/session";
import { getRequestFromVCRequest, calcPinhash } from "@/lib/utils";
import { issue } from "@/server/services/issue.service";
import { issueRequest } from "@/server/services/issueRequest.service";
import { getManifest } from "@/server/services/manifest.service";
import { getBadgeClassById, setOpenBadgeMetadataToImage, validateOpenBadge } from "@/server/services/openBadge.service";
import { registerBadgeVc } from "@/server/services/registerBadgeVc.service";
import { verifyVcRequest } from "@/server/services/verifyVcReqest.service";
import { BadgeImportRequestParam } from "@/types/api/badge";
import { ErrorResponse } from "@/types/api/error";

type RequestBody = BadgeImportRequestParam;

export default async function handler(req: NextApiRequest & Session, res: NextApiResponse<void | ErrorResponse>) {
  const { uniquehash, email, badgeMetaData, lmsId, lmsName }: RequestBody = req.body;

  // TODO: Orthrosログイン情報をもとにwalletIdを取得
  const walletId = 1;
  const { image } = badgeMetaData.badge;
  // image : "data:image/png;base64,iVBORw0KGg..."; // base64エンコードされた画像データ
  const base64ImageWithoutPrefix = image.split(",")[1];

  try {
    const result = await validateOpenBadge(email, badgeMetaData);
    if (!result) throw new Error();
  } catch {
    return res.status(400).json({ error: { errorMessage: errors.validation.openBadge } });
  }

  try {
    const openBadgeImage = await setOpenBadgeMetadataToImage(base64ImageWithoutPrefix, badgeMetaData);

    const manifestURL = process.env.vc_manifest_url;
    await withSession(req, res);
    const badgeClass = await getBadgeClassById(badgeMetaData.badge.id);
    const verificationURL = badgeMetaData.verify.url;

    const { pin, url } = await issueRequest(
      manifestURL,
      badgeClass,
      verificationURL,
      email,
      req.session.id,
      openBadgeImage,
      badgeMetaData.issuedOn?.toString(),
      badgeMetaData.expires?.toString(),
    );

    // 受け取ったvcRequestUrlをもとに、発行リクエストを検証
    const vcRequestInJwt = await verifyVcRequest(url);

    const { vcRequest } = getRequestFromVCRequest(vcRequestInJwt);

    const manifest = await getManifest(manifestURL);
    const acquiredAttestation = {};

    if (vcRequest.id_token_hint) {
      acquiredAttestation["idTokens"] = { "https://self-issued.me": vcRequest.id_token_hint };
    }

    const pinhash = await calcPinhash(pin.toString(), vcRequest.pin.salt);
    const vcJwt = await issue(vcRequest, manifest, acquiredAttestation, { pin: pinhash });

    await registerBadgeVc({ walletId, lmsId, lmsName, uniquehash, badgeMetaData, email, vcJwt });
    return res.status(200).json();
  } catch (e) {
    console.error(e.message);
    return res.status(500).json({ error: { errorMessage: errors.vcImportFailed, detail: e } });
  }
}
