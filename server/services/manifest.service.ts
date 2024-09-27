import axios from "axios";
import { loggerError, loggerInfo } from "@/lib/logger";
import { getManifestFromJWT } from "@/lib/utils";
import { Manifest } from "@/types";

const DEFAULT_MANIFEST: Manifest = {
  id: "default-manifest-id",
  display: {   
    contract: process.env.vc_manifest_contract_url || "",
    card: {
      title: "Default Title",
      issuedBy: "Default Issuer",
      backgroundColor: "#FFFFFF",
      textColor: "#000000",
      logo: { uri: "", description: "" },
      description: "Default Description"
    },
    claims: {}
  },
  input: {
    credentialIssuer: process.env.vc_manifest_credential_issuer_url || "",
    attestations: { idTokens: [] }
  }
};

export const getManifest = async (manifestURL: string): Promise<Manifest> => {
  const maxRetries = 3;
  const retryDelay = 1000; // 1秒
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      loggerInfo(`Attempting to fetch manifest (Attempt ${attempt}/${maxRetries})`);
      
      const response = await axios.get<{ token: string }>(manifestURL);
      const manifestToken = response.data.token;
      
      if (!manifestToken) {
        throw new Error("Manifest token is empty");
      }
      
      const fullManifest = getManifestFromJWT(manifestToken);
      
      if (!fullManifest || !fullManifest.input?.credentialIssuer || !fullManifest.display?.contract) {
        throw new Error("Invalid manifest or missing required fields");
      }
      // 必要最小限のフィールドを確保しつつ、他のフィールドはデフォルト値や空のオブジェクトで補完
      const minimalManifest: Manifest = {
        id: fullManifest.id || DEFAULT_MANIFEST.id,
        input: {
          credentialIssuer: fullManifest.input.credentialIssuer,
          attestations: fullManifest.input.attestations || DEFAULT_MANIFEST.input.attestations
        },
        display: {
          contract: fullManifest.display.contract,
          card: fullManifest.display.card || DEFAULT_MANIFEST.display.card,
          claims: fullManifest.display.claims || {}
        }
      };
      loggerInfo("Manifest successfully retrieved with required fields");
      return minimalManifest;
    } catch (error) {
      loggerError(`Error fetching manifest on attempt ${attempt}:`, error);
      
      if (attempt < maxRetries) {
        loggerInfo(`Retrying in ${retryDelay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
  }
  // 全ての試行が失敗した場合、デフォルト値のみのマニフェストを返す
  loggerError(`Failed to retrieve manifest after ${maxRetries} attempts, using default values`);
  loggerInfo(`Debug const manifest.input.credentialIssuer: ${DEFAULT_MANIFEST.input.credentialIssuer}`);
  loggerInfo(`Debug const manifest.display.contract: ${DEFAULT_MANIFEST.display.contract}`);
  
  return DEFAULT_MANIFEST;
};