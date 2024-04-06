import { pbkdf2Sync, randomBytes } from "crypto";

/**
 * Transform plain text password to value keep in database
 * @param password plain text password to transform
 * @returns value used in database in format hashedAndSaltedPassword$salt
 */
export const generateHashedPassword = (password: string): string => {
  const salt = randomBytes(32).toString("hex");
  const hashedAndSaltedPassword = hashAndSaltPassword(password, salt);
  return `${hashedAndSaltedPassword}$${salt}`;
};

/**
 * Compare password during logging user
 * @param inputPassword password get from login form in plain text
 * @param passwordFromDatabase password from database in format hashedAndSaltedPassword$salt
 * @returns true if input password matches to password from database
 */
export const comparePasswords = (
  inputPassword: string,
  passwordFromDatabase: string
): boolean => {
  const [hashedAndSaltedPassword, salt] =
    returnHashedAndSaltedPasswordFromDatabaseValue(passwordFromDatabase);
  const hashedAndSaltedInputPassword = hashAndSaltPassword(inputPassword, salt);
  return hashedAndSaltedInputPassword === hashedAndSaltedPassword;
};

/**
 * Get hashed and salted password from value keep in database
 * @param passwordFromDatabase password from database in format hashedAndSaltedPassword$salt
 * @returns array with hashed and salted password and salt
 */
const returnHashedAndSaltedPasswordFromDatabaseValue = (
  passwordFromDatabase: string
) => {
  const [hashedAndSaltedPassword, salt] = passwordFromDatabase.split("$");
  if (!salt) {
    throw new Error("Password saved in database has incorrect format");
  }
  return [hashedAndSaltedPassword, salt];
};

/**
 * Transform plain text password to hashed and salted password
 * @param password plain text password to transform
 * @param salt random value modifying calculated password
 * @returns hashed and salted password
 */
const hashAndSaltPassword = (password: string, salt: string) => {
  const HASH_ITERATIONS = 1000;
  const KEY_LENGTH = 64;
  const DIGEST_FUNCTION = "sha512";
  return pbkdf2Sync(
    password,
    salt,
    HASH_ITERATIONS,
    KEY_LENGTH,
    DIGEST_FUNCTION
  ).toString("hex");
};
