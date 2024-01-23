import { loggerWarn } from "./logger";

import { RetryConfig } from "@/types/config";

const wait = (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

/**
 * リトライ処理を実装するための共通関数。Promiseをラップして使用します。
 * @param operation 実行する非同期関数
 * @param config リトライ時の設定（リトライ回数、リトライ時間）
 * @returns
 */
export const retryRequest = async (operation: () => Promise<any>, config: RetryConfig) => {
  for (let i = 0; i < config.count; i++) {
    try {
      const res = await operation();
      return res;
    } catch (exp) {
      if (i < config.count - 1) {
        loggerWarn(`Retry attempt ${i + 1}: ${exp.message}, Retry Time: ${config.time} ms`);
        await wait(config.time);
        continue;
      } else {
        throw exp;
      }
    }
  }
};

/**
 * リトライ処理を実装するための共通関数（openbadge検証用）。Promiseをラップして使用します。
 * @param operation 実行する非同期関数
 * @param config リトライ時の設定（リトライ回数、リトライ時間）
 * @returns
 */
export const retryRequestForBadgeVerify = async (operation: () => Promise<any>, config: RetryConfig) => {
  for (let i = 0; i < config.count; i++) {
    try {
      const res = await operation();

      if (res.data.report.valid) {
        return res;
      } else {
        throw new Error("Failed To Badge Verify");
      }
    } catch (exp) {
      if (i < config.count - 1) {
        loggerWarn(`Retry attempt ${i + 1}: ${exp.message}, Retry Time: ${config.time} ms`);
        await wait(config.time);
        continue;
      } else {
        throw exp;
      }
    }
  }
};
