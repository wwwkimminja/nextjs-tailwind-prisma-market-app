export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_REGEX = new RegExp(/^(?=.*\d).+$/);
export const EMAIL_REGEX = /^[\w.-]+@zod\.com$/;
export const PASSWORD_REGEX_ERROR =
  'Passwords must contain at least one number (0123456789)';
