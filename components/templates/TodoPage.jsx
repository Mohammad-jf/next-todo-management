import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import RadioButton from "../element/RadioButton";
import { GrAddCircle } from "react-icons/gr";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import { useSession } from "next-auth/react";

const TodoPage = () => {
  const router = useRouter();
  const { todoId } = router.query;
  const { status } = useSession();
  const [todoData, setTodoData] = useState({});
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [todoStatus, setStatus] = useState("todo");

  const getTodo = async () => {
    const res = await fetch(`/api/todos/${todoId}`);
    const data = await res.json();
    if (data.status === "success") {
      setTodoData(data.data);
      console.log(data);
    }
  };

  useEffect(() => {
    if (status !== "authenticated") {
      router.replace("/signin");
    }
    getTodo();
  }, [todoId, status]);

  const saveHandler = async () => {
    const res = await fetch(`/api/todos/${todoId}`, {
      method: "PATCH",
      body: JSON.stringify({ title, status: todoStatus }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    console.log(data);
    if (data.status === "success") {
      getTodo();
      setTitle("");
      setStatus("todo");
      setEditing(false);
    }
  };

  const editHandler = (isValid) => {
    if (isValid) {
      setTitle(todoData.title);
      setStatus(todoData.status);
    } else {
      setTitle("");
      setStatus("");
    }
  };

  return (
    <>
      <div className="profile-data">
        <h2>Update Todo</h2>
        <div>
          <span>Title: </span>
          <p>{todoData.title}</p>
        </div>
        <div>
          <span>Status: </span>
          <p>{todoData.status}</p>
        </div>
      </div>

      {editing ? (
        <button
          style={{ marginTop: "10px" }}
          onClick={() => (setEditing(false), editHandler(false))}
        >
          Cancel
        </button>
      ) : (
        <button
          style={{ marginTop: "10px" }}
          onClick={() => (setEditing(true), editHandler(true))}
        >
          Edit
        </button>
      )}

      {editing && (
        <div className="add-form">
          <h2>
            <GrAddCircle />
            Update Todo
          </h2>

          <div className="add-form__input">
            <div className="add-form__input--first">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="add-form__input--second">
              <RadioButton
                className="todo"
                htmlFor="todo"
                id="todo"
                value="todo"
                status={todoStatus}
                onChange={(e) => setStatus(e.target.value)}
              >
                <BsAlignStart />
                Todo
              </RadioButton>

              <RadioButton
                className="inProgress"
                htmlFor="inProgress"
                id="inProgress"
                value="inProgress"
                status={todoStatus}
                onChange={(e) => setStatus(e.target.value)}
              >
                <FiSettings />
                In Progress
              </RadioButton>

              <RadioButton
                className="review"
                htmlFor="review"
                id="review"
                value="review"
                status={todoStatus}
                onChange={(e) => setStatus(e.target.value)}
              >
                <AiOutlineFileSearch />
                Review
              </RadioButton>

              <RadioButton
                className="done"
                htmlFor="done"
                id="done"
                status={todoStatus}
                value="done"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MdDoneAll />
                Done
              </RadioButton>
            </div>

            <button onClick={saveHandler}>save changes</button>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoPage;
