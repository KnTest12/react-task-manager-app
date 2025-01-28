import { useState } from "react";

export default function TaskInfo({ task, onCompleteTask, onDeleteTask }) {
  const [toggleDescription, setToggleDescription] = useState(false);

  function handleDescription() {
    setToggleDescription((toggleDescription) => !toggleDescription);
  }

  return (
    <li>
      <div>
        <p className="toggle" onClick={handleDescription}>
          Task #{task.id}: {task.title}
        </p>
        <div className="task-action">
          <span className="deadline">
            {task.deadline > 1 && "🕒"}
            {task.deadline === 1 && "⚠️"}
            {task.deadline === 0 && "❗"}
            {task.deadline ?? "✔️"}
            {task.deadline || task.deadline === 0 ? ` Days left` : "Done"}
          </span>
          {task.status === "completed" || (
            <>
              <span
                className="delete-task"
                onClick={() => onDeleteTask(task.id)}
              >
                🗑️
              </span>
              <span
                className="complete-task"
                onClick={() => onCompleteTask(task.id)}
              >
                ✅
              </span>
            </>
          )}
        </div>
      </div>
      {toggleDescription && <p>{task.description}</p>}
    </li>
  );
}
