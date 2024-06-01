import { verify } from 'jsonwebtoken';

const { hash, compare, genSalt } = require('bcryptjs');

async function hashPassword(password) {
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}

async function verifyPassword(password, hashedPass) {
  const isValid = await compare(password, hashedPass);
  return isValid;
}

function verifyToken(token, secretKey) {
  try {
    const verifiedToken = verify(token, secretKey);
    return { email: verifiedToken.email };
  } catch (error) {
    console.log(error);
    return false;
  }
}
export { hashPassword, verifyPassword, verifyToken };
