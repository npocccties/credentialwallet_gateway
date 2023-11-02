export const errors = {
  response400: {
    label: "400: Bad Request",
    message: "パラメータが不正です。",
  },
  response500: {
    label: "500: Internal Server Error",
    message: "サーバー側の処理中にエラーが発生しました。管理者へお問い合わせください。",
  },
  unexpectedError: {
    label: "Un Expected Error",
    message: "予期せぬエラーが発生しました。管理者へお問い合わせください。",
  },
  validation: {
    email: "eメールアドレスが不正な値です。",
  },
} as const;
