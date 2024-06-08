
import User from '@/models/User';
import { verifyPassword } from '@/utils/auth';
import connectDB from '@/utils/connectDB';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  if (req.method !== 'PATCH') return;
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 'failed', message: 'failed to connect to Db' });
  }

  const { name, lastName, password } = req.body;

  const session = getSession({ req });
  if (!session) {
    return res.status(401).json({ status: 'failed', message: 'UnAuthorize' });
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: 'failed', message: 'user not found' });
  }

  try {
    if (!name || !lastName || !password) {
      return res
        .status(422)
        .json({ status: 'failed', message: 'invalid user credentials' });
    }

    const isValid = verifyPassword(password, user.password);
    if (!isValid) {
      return res
        .status(422)
        .json({ status: 'failed', message: 'invalid credential' });
    }

    user.name = name;
    user.lastName = lastName;
    await user.save();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'failed', message: 'cant update the  user' });
  }
}
