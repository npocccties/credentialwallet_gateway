export const pagePath = {
  wallet: {
    list: "/",
    add: "/wallet/add",
    detail: "/wallet/detail",
  },
  badge: {
    import: "/badge/import",
  },
  submission: {
    enter: "/submission",
    confirm: "/submission/confirm",
  },
} as const;

export const sessionStorageKey = {
  confirmCode: "confirmCode",
  submissionEmail: "submissionEmail",
  consumer: "consumer",
  badgeVc: "badgeVc",
} as const;
