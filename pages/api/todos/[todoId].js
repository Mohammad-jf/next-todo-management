import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "failed", message: "unable to connect to DB" });
  }

  const session = await getSession({ req });

  // check to see if user is loggedIn or not
  if (!session) {
    return res.status(401).json({ status: "failed", message: "unAuthorize" });
  }

  // check again to see there is a user with this email or not
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res.status(401).json({ status: "failed", message: "unAuthorize" });
  }

  const { todoId } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const todos = user.todos;
        const todo = todos.filter((todo) => todo._id == todoId);
        if (!todo) {
          return res
            .status(404)
            .json({ status: "failed", message: "todo not found" });
        }

        res.status(200).json({ status: "success", data: todo[0] });
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ status: "failed", message: "cant get todo" });
      }
      break;
    case "PATCH":
      try {
        const { title, status } = req.body;
        if (!title || !status) {
          return res
            .status(422)
            .json({ status: "failed", message: "invalid credential" });
        }
        const result = await User.updateOne(
          { "todos._id": todoId },
          { $set: { "todos.$.titile": title, "todos.$.status": status } }
        );
        console.log(result);
        res.status(200).json({ status: "success", message: "todo updated" });
      } catch (error) {
        return res
          .status(422)
          .json({ status: "failed", message: "updating todo failed" });
      }
  }
}
