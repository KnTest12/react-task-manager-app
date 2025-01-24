import { useState } from "react";

const taskList = [
  {
    id: 1,
    title: "Test",
    description: "Lorem impsum",
    deadline: 5,
    status: "current",
  },
  {
    id: 2,
    title: "Working",
    description: "Hello World",
    deadline: 1,
    status: "important",
  },
  {
    id: 3,
    title: "Panic",
    description: "Goodbye",
    deadline: 0,
    status: "important",
  },
  {
    id: 4,
    title: "Nice",
    description: "Completed",
    deadline: null,
    status: "completed",
  },
  {
    id: 5,
    title: "Oh no",
    description:
      "Where is this number of the deadline coming from, kinda suspicious....",
    deadline: 4,
    status: "current",
  },
  {
    id: 6,
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At iam decimum annum in spelunca iacet. Quamquam te quidem video minime esse deterritum. Neque enim disputari sine reprehensione nec cum iracundia aut pertinacia recte disputari potest. Itaque hic ipse iam pridem est reiectus; Duo Reges: constructio interrete.        Expectoque quid ad id, quod quaerebam, respondeas",
    deadline: 0,
    status: "important",
  },
];

export default function App() {
  return (
    <div className="app">
      <div className="header">
        <h2>Task Manager App</h2>
      </div>
      <Sidebar />
      <TaskManager />
      <form className="form-add-task">
        <label>Title</label>
        <input type="text"></input>
        <label>Description</label>
        <input type="text"></input>
        <label>Due Date</label>
        <input type="date"></input>
        <button>Add Task</button>
      </form>
      <div className="footer">©️ 2025 KN</div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="sidebar">
      <h4>Actions</h4>
      <div>Filter tasks by...</div>
      <div>Current</div>
      <div>Completed</div>
      <div>Important</div>
      <div>None</div>
      <button>Add New Task</button>
    </div>
  );
}

function TaskManager() {
  return (
    <div className="content">
      <Sortbar />
      <Tasklist>current</Tasklist>
      <Tasklist>important</Tasklist>
      <Tasklist>completed</Tasklist>
    </div>
  );
}

function Sortbar() {
  return (
    <div className="sortbar">
      <label>Sort By:</label>
      <span>Task Number</span>
      <span>Deadlines</span>
    </div>
  );
}

function Tasklist({ children }) {
  const [tasks, setTasks] = useState([...taskList]);

  const filteredTasks = tasks.filter((tasks) => tasks.status === children);
  const numTasks = filteredTasks.length;

  return (
    <div className={children}>
      <TaskStatus numTasks={numTasks} name={children} />
      <ul>
        {filteredTasks.map((task) => (
          <TaskInfo task={task} key={task.id} />
        ))}
      </ul>
    </div>
  );
}

function TaskStatus({ numTasks, name }) {
  return (
    <div className="task-header">
      {name === "current" ? "🟦" : name === "important" ? "🟨" : "🟪"} {name}
      <span>{numTasks}</span>
    </div>
  );
}

function TaskInfo({ task }) {
  return (
    <li>
      <div>
        <p>
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
              <span className="delete-task">🗑️</span>
              <span className="complete-task">✅</span>
            </>
          )}
        </div>
      </div>
      <p>{task.description}</p>
    </li>
  );
}
