export const validateEmail = (email: string): boolean => {
  const emailPattern = /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailPattern.test(email);
};

export const validateForbiddenCharacters = (value) => {
  // eslint-disable-next-line no-control-regex
  const forbiddenCharacters = /[\x00-\x1f\x22\x27\x2c\x5c\x60\x09\x0a\x0d]/;
  return !forbiddenCharacters.test(value);
};


export const formValidateForbiddenCharacters = (value) => {
  return validateForbiddenCharacters(value) || "使用禁止文字が含まれています。"
}