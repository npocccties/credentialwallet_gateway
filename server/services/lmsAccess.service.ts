import { LmsList } from "@prisma/client";
import axios, { AxiosRequestConfig } from "axios";

import { errors } from "@/constants/error";
import { logStatus } from "@/constants/log";
import { loggerDebug, loggerError } from "@/lib/logger";
import { IfBadgeInfo } from "@/types/BadgeInfo";
import { BadgeMetaData } from "@/types/badgeInfo/metaData";

const getMyToken = async (username: string, password: string, selectLms: LmsList): Promise<string> => {
  const { lmsUrl, lmsService } = selectLms;
  const tokenUrlBase = `${lmsUrl}/login/token.php`;
  const tokenURL = `${tokenUrlBase}?username=${username}&password=${password}&service=${lmsService}`;

  const options: AxiosRequestConfig = {
    method: "GET",
    url: tokenURL,
    //httpsAgent: new https.Agent({ rejectUnauthorized: false }), // SSL Error: Unable to verify the first certificateの回避 正式な証明書なら出ないはず
  };
  loggerDebug("moodle requestUrl", `${tokenUrlBase}?username=${username}&password=****&service=${lmsService}`);

  try {
    const { data } = await axios(options);
    if (data.error) {
      throw new Error(data.errorcode);
    }

    return data.token;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      loggerError("Error getMyTokens:(axios)", err.message);
    }
    if (err.message === errors.moodleErrorCode.invalidLogin) {
      loggerError("moodle login error");
    }
    throw err;
  }
};

const getMyTokenAdmin = async (username: string, selectLms: LmsList): Promise<string> => {
  const token = selectLms.lmsAccessToken;
  const { lmsUrl, lmsService } = selectLms;
  const tokenUrlBase = `${lmsUrl}/webservice/rest/server.php`;
  const tokenURL = `${tokenUrlBase}?wstoken=${token}&wsfunction=tool_token_get_token&moodlewsrestformat=json&idtype=username&idvalue=${username}&service=${lmsService}`;

  const options: AxiosRequestConfig = {
    method: "GET",
    url: tokenURL,
    //httpsAgent: new https.Agent({ rejectUnauthorized: false }), // SSL Error: Unable to verify the first certificateの回避 正式な証明書なら出ないはず
  };

  loggerDebug("moodle sso requestUrl", tokenURL);

  try {
    const { data } = await axios(options);
    return data.token;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      loggerError("Error getMyTokens:(axios)", err.message);
    }
    throw err;
  }
};

const getMyBadges = async (token: string, selectLms: LmsList): Promise<IfBadgeInfo[]> => {
  const { lmsUrl } = selectLms;
  const myBadgesURL = `${lmsUrl}/webservice/rest/server.php?wsfunction=core_badges_get_user_badges&moodlewsrestformat=json&wstoken=${token}`;

  const options: AxiosRequestConfig = {
    method: "GET",
    url: myBadgesURL,
    //httpsAgent: new https.Agent({ rejectUnauthorized: false }), // SSL Error: Unable to verify the first certificateの回避 正式な証明書なら出ないはず
  };
  try {
    const { data } = await axios(options);
    loggerDebug("response getMyBadges", data.badges);

    return data.badges;
  } catch (err) {
    loggerError(`${logStatus.error}`, err.message);
    throw err;
  }
};

export const myBadgesList = async (username: string, password: string, selectLms: LmsList): Promise<IfBadgeInfo[]> => {
  try {
    const { ssoEnabled } = selectLms;
    let token = "";
    if (ssoEnabled) {
      token = await getMyTokenAdmin(username, selectLms);
    } else {
      token = await getMyToken(username, password, selectLms);
    }
    const badgesInfoJson: IfBadgeInfo[] = await getMyBadges(token, selectLms);

    return badgesInfoJson;
  } catch (err) {
    loggerError(`${logStatus.error} server/service/lmsAccess.service myBadgesList`);
    throw err;
  }
};

export const myOpenBadge = async (uniquehash: string, lmsUrl: string): Promise<BadgeMetaData> => {
  const myOpenBadgeURL = `${lmsUrl}/badges/assertion.php?obversion=2&b=${uniquehash}`;
  try {
    const openBadgeMeta = await axios.get(myOpenBadgeURL).then((res) => res.data);
    return openBadgeMeta;
  } catch (err) {
    loggerError(`${logStatus.error} server/services/lmsAccess.service myOpenBadge`);
    throw err;
  }
};
