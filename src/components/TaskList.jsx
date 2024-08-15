import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../redux/taskSlice";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = () => {
    if (title.trim()) {
      dispatch(addTask({ title, description }));
      setTitle("");
      setDescription("");
    }
  };

  const handleToggleTask = (task) => {
    dispatch(
      updateTask({ id: task._id, updates: { completed: !task.completed } })
    );
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <div className="w-full lg:w-1/4 bg-teal-600 p-6 text-white">
        <h1 className="text-3xl font-bold mb-6">Task Manager</h1>
        <div className="mb-6 p-4 bg-teal-500 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Add a New Task</h2>
          <input
            type="text"
            className="border p-2 rounded w-full mb-2 text-gray-800"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="border p-2 rounded w-full mb-2 text-gray-800"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-teal-700 hover:text-white transition"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="w-full lg:w-3/4 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className={`p-4 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl ${
                task.completed
                  ? "bg-green-100 text-green-800"
                  : "bg-white text-gray-800"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3
                    className={`text-lg font-semibold ${
                      task.completed ? "line-through" : ""
                    }`}
                  >
                    {task.title}
                  </h3>
                  <p
                    className={`text-gray-600 ${
                      task.completed ? "line-through" : ""
                    }`}
                  >
                    {task.description}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    className={`text-sm px-3 py-1 rounded ${
                      task.completed ? "bg-green-500" : "bg-gray-400"
                    } hover:bg-green-600 text-white`}
                    onClick={() => handleToggleTask(task)}
                  >
                    {task.completed ? "Undo" : "Done"}
                  </button>
                  <button
                    className="text-sm px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
