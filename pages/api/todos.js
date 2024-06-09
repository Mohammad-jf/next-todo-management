import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { sortTodos } from "@/utils/sortTodos";
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

  switch (req.method) {
    case "POST":
      const { title, status } = req.body;
      try {
        if (!title || !status) {
          res
            .status(422)
            .json({ status: "failed", message: "title or status is missing" });
        }

        user.todos.push({ title, status });
        await user.save();
        res.status(201).json({
          status: "success",
          message: "todo created",
          todo: { title, status },
        });
      } catch (error) {
        console.log(error);
        return res
          .status(422)
          .json({ status: "failed", message: "failed to create todo" });
      }
      break;

    case "GET":
      try {
        if (!user.todos) {
          return res
            .status(404)
            .json({ status: "failed", message: "there is no todos" });
        } else {
          const sortedTodos = sortTodos(user.todos);
          return res
            .status(200)
            .json({ status: "success", todos: sortedTodos });
        }
      } catch (error) {
        console.log(error);
        return res
          .status(404)
          .json({ status: "failed", message: "failed to get todos" });
      }
      break;
    case "PATCH":
      try {
        const { id, status } = req.body;
        if (!id || !status) {
          return res
            .status(422)
            .json({ status: "failed", message: "invalid credential" });
        }
        const result = await User.updateOne(
          { "todos._id": id },
          { $set: { "todos.$.status": status } }
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
