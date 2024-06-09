import React, { useEffect } from "react";
import { useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import RadioButton from "../element/Radiobutton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTodoPage = () => {
  const [title, setTitle] = useState("");
  const [todoStatus, setStatus] = useState("todo");
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      router.replace("/signin");
    }
  }, [status]);

  const addHandler = async () => {
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title, status: todoStatus }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (data.status === "success") {
      toast.success("Todo Created");
      setTitle("");
      setStatus("todo");
    }
  };

  return (
    <div className="add-form">
      <h2>
        <GrAddCircle />
        Add New Todo
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

        <button onClick={addHandler}>Add Todo</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddTodoPage;
