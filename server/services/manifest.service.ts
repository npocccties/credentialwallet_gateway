import axios from "axios";

import { loggerError,loggerInfo } from "@/lib/logger";
import { getManifestFromJWT } from "@/lib/utils";
import { Manifest } from "@/types";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getManifest = async (manifestURL: string): Promise<Manifest | null> => {
  const maxRetries = 10;
  const retryDelay = 3000; // 3秒

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      loggerInfo(`Attempting to fetch manifest (Attempt ${attempt}/${maxRetries})`);

      const response = await axios.get<{ token: string }>(manifestURL);
      const manifestToken = response.data.token;

      if (!manifestToken) {
        throw new Error("Manifest token is empty");
      }

      loggerInfo("Manifest token retrieved successfully");

      const manifest = getManifestFromJWT(manifestToken);

      if (!manifest) {
        throw new Error("Failed to decode manifest from JWT");
      }

      // 必須フィールドの存在確認
      if (!manifest.input?.credentialIssuer || !manifest.display?.contract) {
        throw new Error("Missing required fields in manifest");
      }

      loggerInfo("Manifest successfully retrieved and validated");
      return manifest;

    } catch (error) {
      loggerError(`Error fetching manifest on attempt ${attempt}:`, error);

      if (attempt < maxRetries) {
        loggerInfo(`Retrying in ${retryDelay / 1000} seconds...`);
        await delay(retryDelay);
      } else {
        loggerError(`Failed to retrieve manifest after ${maxRetries} attempts`);
        return null;
      }
    }
  }

  return null;
};