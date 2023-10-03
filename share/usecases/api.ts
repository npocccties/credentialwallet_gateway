const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const api = {
  v1: {
    getVcList: `${baseUrl}/api/v1/getVcList`,
    getVcDetail: `${baseUrl}/api/v1/getVcDetail`,
  },
};
