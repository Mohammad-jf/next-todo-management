import { hash, compare, genSalt } from 'bcrypt';

async function hashPassword(password) {
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}

async function verifyPassword(password, hashedPass) {
  const isValid = await compare(password, hashedPass);
  return isValid;
}

export { hashPassword, verifyPassword };
