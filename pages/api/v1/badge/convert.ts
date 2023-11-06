import type { NextApiRequest, NextApiResponse } from "next";

import { errors } from "@/constants/error";
import { logEndForApi, logStartForApi, logStatus } from "@/constants/log";
import { loggerError, loggerInfo } from "@/lib/logger";
import { Session, withSession } from "@/lib/session";
import { getRequestFromVCRequest, calcPinhash } from "@/lib/utils";
import { issue } from "@/server/services/issue.service";
import { issueRequest } from "@/server/services/issueRequest.service";
import { getManifest } from "@/server/services/manifest.service";
import { getBadgeClassById, setOpenBadgeMetadataToImage, validateOpenBadge } from "@/server/services/openBadge.service";
import { registerBadgeVc } from "@/server/services/registerBadgeVc.service";
import { verifyVcRequest } from "@/server/services/verifyVcReqest.service";
import { api } from "@/share/usecases/api";
import { BadgeImportRequestParam } from "@/types/api/badge";
import { ErrorResponse } from "@/types/api/error";

type RequestBody = BadgeImportRequestParam;

const apiPath = api.v1.badge.convert;

export default async function handler(req: NextApiRequest & Session, res: NextApiResponse<void | ErrorResponse>) {
  loggerInfo(`${logStartForApi(apiPath)}`);
  loggerInfo("request body", req.body);

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
    loggerError(`${logStatus.error} open badge verification failed`);

    return res.status(400).json({ error: { errorMessage: errors.validation.openBadge } });
  }

  try {
    const openBadgeImage = await setOpenBadgeMetadataToImage(base64ImageWithoutPrefix, badgeMetaData);

    const manifestURL = process.env.vc_manifest_url;
    await withSession(req, res);
    const badgeClass = await getBadgeClassById(badgeMetaData.badge.id);
    const verificationURL = badgeMetaData.verify.url;

    loggerInfo(logStartForApi(apiPath, "issue request"));
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
    loggerInfo(logEndForApi(apiPath, "issue request"));

    loggerInfo(logStartForApi(apiPath, "verify issue request"));
    const vcRequestInJwt = await verifyVcRequest(url);

    const { vcRequest } = getRequestFromVCRequest(vcRequestInJwt);

    const manifest = await getManifest(manifestURL);
    const acquiredAttestation = {};

    if (vcRequest.id_token_hint) {
      acquiredAttestation["idTokens"] = { "https://self-issued.me": vcRequest.id_token_hint };
    }
    loggerInfo(logEndForApi(apiPath, "verify issue request"));

    loggerInfo(logStartForApi(apiPath, "issue"));
    const pinhash = await calcPinhash(pin.toString(), vcRequest.pin.salt);

    const vcJwt = await issue(vcRequest, manifest, acquiredAttestation, { pin: pinhash });
    loggerInfo(logEndForApi(apiPath, "issue"));

    await registerBadgeVc({ walletId, lmsId, lmsName, uniquehash, badgeMetaData, email, vcJwt });

    loggerInfo(`${logStatus.success} ${apiPath}`);

    return res.status(200).json();
  } catch (e) {
    loggerError(`${logStatus.error} ${apiPath}`, e.message);

    return res.status(500).json({ error: { errorMessage: errors.vcImportFailed, detail: e } });
  }
}
