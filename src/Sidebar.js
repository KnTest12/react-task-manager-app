import Button from "./Button";

export default function Sidebar({
  onShowAddTask,
  onShowAddForm,
  onFilter,
  filter,
}) {
  return (
    <div className="sidebar">
      <h4>Actions</h4>
      <label>Filter tasks by...</label>
      <ul>
        <li
          className={filter === "current" ? "selected" : null}
          onClick={() => onFilter("current")}
        >
          Current
        </li>
        <li
          className={filter === "important" ? "selected" : null}
          onClick={() => onFilter("important")}
        >
          Important
        </li>
        <li
          className={filter === "completed" ? "selected" : null}
          onClick={() => onFilter("completed")}
        >
          Completed
        </li>
        <li
          className={filter === "none" ? "selected" : null}
          onClick={() => onFilter("none")}
        >
          None
        </li>
      </ul>
      <Button onShowAddTask={onShowAddTask} onClick={onShowAddForm}>
        sidebar-button
      </Button>
    </div>
  );
}
