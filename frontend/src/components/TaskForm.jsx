import React, { useState } from "react";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask(title);
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-3 mb-6"
    >
      <input
        type="text"
        placeholder="✍️ Add a task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        ➕ Add
      </button>
    </form>
  );
}

export default TaskForm;
