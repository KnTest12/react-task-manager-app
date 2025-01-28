import { useState } from "react";
import Sidebar from "./Sidebar";
import TaskManager from "./TaskManager";
import AddForm from "./AddForm";
import { taskList } from "./Data";

export default function App() {
  const [tasks, setTasks] = useState([...taskList]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [id, setId] = useState(tasks.length);
  const [filter, setFilter] = useState("none");

  function handleShowAddForm() {
    setShowAddTask((showAddTask) => !showAddTask);
  }

  function handleAddTask(task) {
    const newId = id + 1;
    setTasks((taskList) => [...taskList, { ...task, id: newId }]);
    setShowAddTask(false);
    setId((id) => id + 1);
  }

  function handleCompleteTask(id) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, deadline: null, status: "completed" } : task
      )
    );
  }

  function handleDeleteTask(id) {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }

  function handleFilter(filterBy) {
    setFilter((filter) => filterBy);
  }

  return (
    <div className="app">
      <div className="header">
        <h2>Task Manager App</h2>
      </div>
      <Sidebar
        onShowAddTask={showAddTask}
        onShowAddForm={handleShowAddForm}
        onFilter={handleFilter}
        filter={filter}
      />
      <TaskManager
        tasks={tasks}
        onCompleteTask={handleCompleteTask}
        onDeleteTask={handleDeleteTask}
        filter={filter}
      />
      {showAddTask && <AddForm onAddTask={handleAddTask} />}
      <div className="footer">©️ 2025 KN</div>
    </div>
  );
}
