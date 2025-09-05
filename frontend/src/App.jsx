import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  // Read (Get all tasks from backend)
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Create (Add new task)
  const addTask = (title) => {
    axios
      .post("http://localhost:5000/api/tasks", { title })
      .then((res) => setTasks([...tasks, res.data]))
      .catch((err) => console.error(err));
  };

  //  Update (Toggle task complete)
  const toggleTask = (id, completed) => {
    axios
      .put(`http://localhost:5000/api/tasks/${id}`, { completed: !completed })
      .then((res) =>
        setTasks(tasks.map((t) => (t._id === id ? res.data : t)))
      )
      .catch((err) => console.error(err));
  };

  //  Update (Edit task title)
  const updateTask = (id, title) => {
    axios
      .put(`http://localhost:5000/api/tasks/${id}`, { title })
      .then((res) =>
        setTasks(tasks.map((t) => (t._id === id ? res.data : t)))
      )
      .catch((err) => console.error(err));
  };

  // Delete (Remove a task)
  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:5000/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter((t) => t._id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div className="app">
      <h1>📝 To-Do List</h1>
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        toggleTask={toggleTask}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
