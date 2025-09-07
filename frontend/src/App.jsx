import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";


function App() {
  const [tasks, setTasks] = useState([]);

  //  Read (Get all tasks from backend)
  useEffect(() => {
    axios
      .get("https://mern-todo-t6wy.onrender.com/api/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  //  Create (Add new task)
  const addTask = (title) => {
    axios
      .post("https://mern-todo-t6wy.onrender.com/api/tasks", { title })
      .then((res) => setTasks([...tasks, res.data]))
      .catch((err) => console.error(err));
  };

  // Update (Toggle task complete)
  const toggleTask = (id, completed) => {
    axios
      .put(`https://mern-todo-t6wy.onrender.com/api/tasks/${id}`, {
        completed: !completed,
      })
      .then((res) =>
        setTasks(tasks.map((t) => (t._id === id ? res.data : t)))
      )
      .catch((err) => console.error(err));
  };

  //  Update (Edit task title)
  const updateTask = (id, title) => {
    axios
      .put(`https://mern-todo-t6wy.onrender.com/api/tasks/${id}`, { title })
      .then((res) =>
        setTasks(tasks.map((t) => (t._id === id ? res.data : t)))
      )
      .catch((err) => console.error(err));
  };

  //  Delete (Remove a task)
  const deleteTask = (id) => {
    axios
      .delete(`https://mern-todo-t6wy.onrender.com/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter((t) => t._id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-green-300 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 w-full max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-6">
          📝 To-Do List
        </h1>
        <TaskForm addTask={addTask} />
        <TaskList
          tasks={tasks}
          toggleTask={toggleTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;
