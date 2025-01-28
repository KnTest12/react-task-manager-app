export default function Button({ onShowAddTask, onClick, children }) {
  return (
    <button className={children} onClick={onClick}>
      {onShowAddTask ? "Close Form" : "Add Task"}
    </button>
  );
}
