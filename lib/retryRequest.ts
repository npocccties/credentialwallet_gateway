import { loggerWarn } from "./logger";

import { REQUEST_RETRY_COUNT } from "@/configs";

const retryCount = REQUEST_RETRY_COUNT;

export const retryRequest = async (operation: () => Promise<any>) => {
  for (let i = 0; i < retryCount; i++) {
    try {
      const res = await operation();
      return res;
    } catch (exp) {
      if (i < retryCount - 1) {
        loggerWarn(`Retry attempt ${i + 1}: ${exp.message}`);
        continue;
      } else {
        throw exp;
      }
    }
  }
};

export const retryRequestForBadgeVerify = async (operation: () => Promise<any>) => {
  for (let i = 0; i < retryCount; i++) {
    try {
      const res = await operation();

      if (res.data.report.valid) {
        return res;
      } else {
        throw new Error("Failed To Badge Verify");
      }
    } catch (exp) {
      if (i < retryCount - 1) {
        loggerWarn(`Retry attempt ${i + 1}: ${exp.message}`);
        continue;
      } else {
        throw exp;
      }
    }
  }
};
