import axios, { AxiosRequestConfig } from "axios";
import { BadgeInfo } from "@/types/api/badge";

const MOODLE_BASE = process.env.MOODLE_BASE;
const OPENBADGE_URL_BASE = `${MOODLE_BASE}/badges/assertion.php?obversion=2`;

const getMyToken = async (username: string, password: string, moodleUrl: string): Promise<string> => {
  const tokenUrlBase = `${moodleUrl}/login/token.php`;
  const tokenURL = `${tokenUrlBase}?username=${username}&password=${password}&service=${process.env.MOODLE_TOKEN_CLIENT}`;
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

const getMyTokenAdmin = async (username: string, moodleUrl: string): Promise<string> => {
  // TODO: 仮のtoken 実際はDBから取得する想定 issue #41
  const token = "721b60a05b20d1083594c14166dd0a9c";
  const tokenUrlBase = `${moodleUrl}/webservice/rest/server.php`;
  const tokenURL = `${tokenUrlBase}?wstoken=${token}&wsfunction=tool_token_get_token&moodlewsrestformat=json&idtype=username&idvalue=${username}&service=moodle_mobile_app`;
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

const getMyBadges = async (token: string, moodleUrl: string): Promise<BadgeInfo[]> => {
  const myBadgesURL = `${moodleUrl}/webservice/rest/server.php?wsfunction=core_badges_get_user_badges&moodlewsrestformat=json&wstoken=${token}`;
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

export const myBadgesList = async (
  username: string,
  password: string,
  isNeedSSO: boolean,
  moodleUrl: string,
): Promise<BadgeInfo[]> => {
  try {
    let token = "";
    if (isNeedSSO) {
      token = await getMyTokenAdmin(username, moodleUrl);
    } else {
      token = await getMyToken(username, password, moodleUrl);
    }
    const badgesInfoJson: BadgeInfo[] = await getMyBadges(token, moodleUrl);

    return badgesInfoJson;
  } catch (err) {
    console.log(`error end myBadgedsList`);
    throw err;
  }
};

export const myOpenBadge = async (uniquehash: string): Promise<any> => {
  console.log(`start myOpenBadge selected uniquehash=[${uniquehash}]`);
  const myOpenBadgeURL = `${OPENBADGE_URL_BASE}&b=${uniquehash}`;
  try {
    const openBadgeMeta = await axios.get(myOpenBadgeURL).then((res) => res.data);
    // console.log("openBadgeMetadata=", openBadgeMeta);
    return openBadgeMeta;
  } catch (err) {
    console.error(`error end myOpenBadge`);
    throw err;
  }
};
