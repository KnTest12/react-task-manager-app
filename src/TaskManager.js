import { useState } from "react";
import Tasklist from "./Tasklist";
import Sortbar from "./Sortbar";

export default function TaskManager({
  tasks,
  filter,
  onCompleteTask,
  onDeleteTask,
}) {
  const [sortBy, setSortBy] = useState("id");

  const currentSort = (a, b) => {
    if (sortBy === "id") {
      return a.id - b.id;
    } else if (sortBy === "deadline") {
      return a.deadline - b.deadline;
    }
  };

  function handleSort(category) {
    setSortBy((sortBy) => category);
  }

  return (
    <div className={filter === "none" ? "content" : "filter-view"}>
      <Sortbar sortBy={sortBy} onSort={handleSort} />
      {(filter === "current" || filter === "none") && (
        <Tasklist
          tasks={tasks}
          onCompleteTask={onCompleteTask}
          onDeleteTask={onDeleteTask}
          currentSort={currentSort}
        >
          current
        </Tasklist>
      )}
      {(filter === "important" || filter === "none") && (
        <Tasklist
          tasks={tasks}
          onCompleteTask={onCompleteTask}
          onDeleteTask={onDeleteTask}
          currentSort={currentSort}
        >
          important
        </Tasklist>
      )}
      {(filter === "completed" || filter === "none") && (
        <Tasklist tasks={tasks} currentSort={(a, b) => b.id - a.id}>
          completed
        </Tasklist>
      )}
    </div>
  );
}
