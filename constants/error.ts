export const errors = {
  response400: {
    label: "400: Bad Request",
    message: "リクエストエラーが発生しました。",
  },
  response500: {
    label: "500: Internal Server Error",
    message: "サーバー側の処理中にエラーが発生しました。",
  },
  unexpectedError: {
    label: "Un Expected Error",
    message: "予期せぬエラーが発生しました。管理者へお問い合わせください。",
  },
  unAuthrizedError: {
    label: "Un Authrized Error",
    message: "認証情報が確認できませんでした。ログインし直してください。",
    detail: {
      noSession: "no session error",
    },
  },
  vcImportFailed: "バッジのインポートに失敗しました。",
  validation: {
    email: "eメールアドレスが不正な値です。",
    openBadge: "Open Badgeの検証に失敗しました。",
  },
  moodleErrorCode: {
    invalidLogin: "invalidlogin",
  },
} as const;
