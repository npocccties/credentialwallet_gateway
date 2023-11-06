export const logStatus = {
  success: "SUCCESS!",
  error: "ERROR!",
};

export const logStartForApi = (apiPath: string, sub: string = "") => {
  return `**************start ${sub} ${apiPath}**************`;
};

export const logEndForApi = (apiPath: string, sub: string = "") => {
  return `**************end ${sub} ${apiPath}**************`;
};

export const logStartForPageSSR = (pagePath: string, sub: string = "") => {
  return `**************start SSR ${sub} ${pagePath}**************`;
};

export const logEndForPageSSR = (pagePath: string, sub: string = "") => {
  return `**************end SSR ${sub} ${pagePath}**************`;
};
