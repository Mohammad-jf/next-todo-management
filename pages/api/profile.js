import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "failed", message: "failed to connect to Db" });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ status: "failed", message: "UnAuthorize" });
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "user not found" });
  }

  switch (req.method) {
    case "POST":
      const { name, lastName, password } = req.body;
      try {
        if (!name || !lastName || !password) {
          return res
            .status(422)
            .json({ status: "failed", message: "invalid user credentials" });
        }

        const isValid = verifyPassword(password, user.password);
        if (!isValid) {
          return res
            .status(422)
            .json({ status: "failed", message: "invalid credential" });
        }

        user.name = name;
        user.lastName = lastName;
        await user.save();
        res.status(200).json({
          status: "success",
          message: "user info completed",
          data: { name, lastName, email: session.user.email },
        });
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ status: "failed", message: "cant update the  user" });
      }
      break;

    case "GET":
      try {
        if (user) {
          return res.status(200).json({
            status: "success",
            data: {
              name: user.name,
              lastName: user.lastName,
              email: user.email,
            },
          });
        }
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ status: "failed", message: "cant get user data" });
      }
      break;
  }
}
