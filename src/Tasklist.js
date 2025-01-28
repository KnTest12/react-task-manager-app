import TaskInfo from "./TaskInfo";
import TaskStatus from "./TaskStatus";

export default function Tasklist({
  tasks,
  children,
  onCompleteTask,
  onDeleteTask,
  currentSort,
}) {
  const filteredTasks = tasks
    .filter((tasks) => tasks.status === children)
    .slice()
    ?.sort(currentSort);
  const numTasks = filteredTasks.length;

  return (
    <div className={children}>
      <TaskStatus numTasks={numTasks} name={children} />
      <ul>
        {filteredTasks.map((task) => (
          <TaskInfo
            task={task}
            key={task.id}
            onCompleteTask={onCompleteTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </ul>
    </div>
  );
}
