import React from "react";
import { RiMastodonLine } from "react-icons/ri";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import { FaPencil } from "react-icons/fa6";
import Link from "next/link";
import { MdDelete } from "react-icons/md";

const Tasks = ({ data, next, back, getTodos }) => {
  const updateHandler = async (id, status) => {
    const res = await fetch("/api/todos", {
      method: "PATCH",
      body: JSON.stringify({ id, status }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") {
      getTodos();
    }
  };

  const deleteHandler = async (todoId) => {
    const res = await fetch(`/api/todos/${todoId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if(data.status==='success'){
      getTodos();
    }
  };

  return (
    <div className="tasks">
      {data?.map((todo) => (
        <div key={todo._id} className="tasks__card">
          <span className={todo.status}></span>
          <RiMastodonLine />
          <Link href={`/todos/${todo._id}`}>
            <FaPencil style={{ marginLeft: "5px" }} />
          </Link>
          <MdDelete
            style={{ marginLeft: "5px" }}
            onClick={() => deleteHandler(todo._id)}
          />
          <h4>{todo.title}</h4>
          <div>
            {back ? (
              <button
                className="button-back"
                onClick={() => updateHandler(todo._id, back)}
              >
                <BiLeftArrow /> Back
              </button>
            ) : null}
            {next ? (
              <button
                className="button-next"
                onClick={() => updateHandler(todo._id, next)}
              >
                Next <BiRightArrow />{" "}
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
