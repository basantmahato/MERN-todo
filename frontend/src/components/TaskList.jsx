import React, { useState } from "react";

function TaskList({ tasks, toggleTask, updateTask, deleteTask }) {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          {editId === task._id ? (
            //  Edit Mode
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <button
                onClick={() => {
                  updateTask(task._id, editTitle);
                  setEditId(null);
                }}
              >
                Save
              </button>
              <button onClick={() => setEditId(null)}>Cancel</button>
            </>
          ) : (
            //  Normal Mode
            <>
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
                onClick={() => toggleTask(task._id, task.completed)}
              >
                {task.title}
              </span>

              {/*  Mark complete/incomplete button */}
              <button onClick={() => toggleTask(task._id, task.completed)}>
                {task.completed ? "↩ Undo" : "✔ Done"}
              </button>

              {/*  Edit button */}
              <button
                onClick={() => {
                  setEditId(task._id);
                  setEditTitle(task.title);
                }}
              >
                ✏️
              </button>

              {/* Delete button */}
              <button onClick={() => deleteTask(task._id)}>❌</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
