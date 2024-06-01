import User from '@/models/User';
import { verifyPassword } from '@/utils/auth';
import connectDB from '@/utils/connectDB';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;
        try {
          await connectDB();
        } catch (error) {
          throw new Error(error);
        }

        if (!email || !password) {
          throw new Error('invalid user credentials');
        }
        const user = User.findOne({ email });
        if (!user) {
          throw new Error('user does not exist');
        }

        const verifiedPassword = verifyPassword(password, user.password);
        if (!verifiedPassword) {
          throw new Error('userName or Password is wrong');
        }
        // use to create token
        return { email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
