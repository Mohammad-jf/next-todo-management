import { useEffect, useState } from "react";
import Tasks from "../modules/Tasks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const HomePage = () => {
  const [todos, setTodos] = useState({});

  const getTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    if (data.status === "success") setTodos(data.todos);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="home-page">
      <div className="home-page--todo">
        <p>Todo</p>
        <Tasks data={todos.todo} getTodos={getTodos} next="inProgress" />
      </div>
      <div className="home-page--inProgress">
        <p>In Progress</p>
        <Tasks
          data={todos.inProgress}
          getTodos={getTodos}
          next="review"
          back="todo"
        />
      </div>
      <div className="home-page--review">
        <p>Review</p>
        <Tasks
          data={todos.review}
          getTodos={getTodos}
          next="done"
          back="inProgress"
        />
      </div>
      <div className="home-page--done">
        <p>Done</p>
        <Tasks data={todos.done} getTodos={getTodos} back="review" />
      </div>
    </div>
  );
};

export default HomePage;
