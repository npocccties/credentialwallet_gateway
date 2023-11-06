export const api = {
  v1: {
    wallet: {
      add: "/api/v1/wallet/add",
    },
    credential: {
      list: "/api/v1/credential/list",
      delete: "/api/v1/credential/delete",
    },
    badge: {
      convert: "/api/v1/badge/convert",
      metadata: "/api/v1/badge/metadata",
      list: "/api/v1/badge/list",
    },
    submission: {
      sendmail: "/api/v1/submission/sendmail",
      vc: "/api/v1/submission/vc",
    },
    user_badgelist: "/api/v1/user_badgelist",
  },
};

export const cabinetApi = {
  v1: {
    submissionBadge: "/api/v1/submission_badge",
  },
};
