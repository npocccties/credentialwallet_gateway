import { LmsList } from "@prisma/client";
import axios, { AxiosRequestConfig } from "axios";

import { IfBadgeInfo } from "@/types/BadgeInfo";
import { BadgeMetaData } from "@/types/badgeInfo/metaData";

const getMyToken = async (username: string, password: string, selectLms: LmsList): Promise<string> => {
  const { lmsUrl, lmsService } = selectLms;
  const tokenUrlBase = `${lmsUrl}/login/token.php`;
  const tokenURL = `${tokenUrlBase}?username=${username}&password=${password}&service=${lmsService}`;

  const options: AxiosRequestConfig = {
    method: "GET",
    url: tokenURL,
    //httpsAgent: new https.Agent({ rejectUnauthorized: false }), // SSL Error: Unable to verify the first certificateの回避　正式な証明書なら出ないはず
  };
  console.log("requestUrl", tokenURL);

  try {
    const { data } = await axios(options);
    console.log("getToken", data.token);
    return data.token;
  } catch (err) {
    console.log("Error getMyTokens 01:", err);
    if (axios.isAxiosError(err)) {
      console.log("Error getMyTokens:(axios)", err.message);
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
    //httpsAgent: new https.Agent({ rejectUnauthorized: false }), // SSL Error: Unable to verify the first certificateの回避　正式な証明書なら出ないはず
  };
  console.log("requestUrl Admin", tokenURL);

  try {
    const { data } = await axios(options);
    console.log("getTokenAdmin", data.token);
    return data.token;
  } catch (err) {
    console.log("Error getMyTokenAdmin 01:", err);
    if (axios.isAxiosError(err)) {
      console.log("Error getMyTokens:(axios)", err.message);
    }
    throw err;
  }
};

const getMyBadges = async (token: string, selectLms: LmsList): Promise<IfBadgeInfo[]> => {
  const { lmsUrl } = selectLms;
  const myBadgesURL = `${lmsUrl}/webservice/rest/server.php?wsfunction=core_badges_get_user_badges&moodlewsrestformat=json&wstoken=${token}`;
  console.log("myBadgesURL =", myBadgesURL);

  const options: AxiosRequestConfig = {
    method: "GET",
    url: myBadgesURL,
    //httpsAgent: new https.Agent({ rejectUnauthorized: false }), // SSL Error: Unable to verify the first certificateの回避　正式な証明書なら出ないはず
  };
  try {
    const { data } = await axios(options);
    console.log("response=", data.badges);
    return data.badges;
  } catch (err) {
    console.error("Error getMyBadges 01:", err);
    if (axios.isAxiosError(err)) {
      console.log("Error getMyBadges:(axios)", err.message);
    }
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
    console.log(`error end myBadgedsList`);
    throw err;
  }
};

export const myOpenBadge = async (uniquehash: string, lmsUrl: string): Promise<BadgeMetaData> => {
  console.log(`start myOpenBadge selected uniquehash=[${uniquehash}]`);
  // TODO: 選択されたMoodleのURLを差し込む
  // const myOpenBadgeURL = `${lmsUrl}/badges/assertion.php?obversion=2&b=${uniquehash}`;
  const myOpenBadgeURL = `https://z.cccties.org/41a/badges/assertion.php?obversion=2&b=${uniquehash}`;
  try {
    const openBadgeMeta = await axios.get(myOpenBadgeURL).then((res) => res.data);
    console.log("openBadgeMetadata=", openBadgeMeta);
    return openBadgeMeta;
  } catch (err) {
    console.error(`error end myOpenBadge`);
    throw err;
  }
};
