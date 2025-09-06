import { useState } from "react";

function TaskList({ tasks, toggleTask, updateTask, deleteTask }) {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  return (
    <ul className="space-y-4 mt-6">
      {tasks.map((task) => (
        <li
          key={task._id}
          className="flex flex-col sm:flex-row sm:items-center justify-between bg-white shadow-lg rounded-xl p-4 border border-gray-100 hover:shadow-xl transition duration-200"
        >
          {editId === task._id ? (
            // ✏️ Edit Mode
            <div className="flex flex-col sm:flex-row w-full gap-3">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    updateTask(task._id, editTitle);
                    setEditId(null);
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium"
                >
                  💾 Save
                </button>
                <button
                  onClick={() => setEditId(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition font-medium"
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          ) : (
            // ✅ Normal Mode
            <div className="flex flex-col sm:flex-row w-full items-center justify-between gap-3">
              <span
                className={`flex-1 cursor-pointer text-lg sm:text-xl font-medium ${
                  task.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
                onClick={() => toggleTask(task._id, task.completed)}
              >
                {task.title}
              </span>

              <div className="flex gap-2">
                {/* ✔ Mark complete/incomplete */}
                <button
                  onClick={() => toggleTask(task._id, task.completed)}
                  className={`px-4 py-2 rounded-lg text-white font-medium shadow-md transition ${
                    task.completed
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {task.completed ? "↩ Undo" : "✔ Done"}
                </button>

                {/* ✏️ Edit */}
                <button
                  onClick={() => {
                    setEditId(task._id);
                    setEditTitle(task.title);
                  }}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition font-medium shadow-md"
                >
                  ✏️ Edit
                </button>

                {/* ❌ Delete */}
                <button
                  onClick={() => deleteTask(task._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium shadow-md"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
