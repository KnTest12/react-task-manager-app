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
  const [tasks, setTasks] = useState([...taskList]);
  const [showAddTask, setShowAddTask] = useState(false);
  const id = tasks.length + 1;

  function handleShowAddForm() {
    setShowAddTask((showAddTask) => !showAddTask);
  }

  function handleAddTask(task) {
    setTasks((taskList) => [...taskList, task]);
    setShowAddTask(false);
  }

  function handleCompleteTask(id) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, deadline: null, status: "completed" } : task
      )
    );
  }

  return (
    <div className="app">
      <div className="header">
        <h2>Task Manager App</h2>
      </div>
      <Sidebar showAddTask={showAddTask} onShowAddForm={handleShowAddForm} />
      <TaskManager tasks={tasks} onCompleteTask={handleCompleteTask} />
      {showAddTask && <AddForm id={id} onAddTask={handleAddTask} />}
      <div className="footer">©️ 2025 KN</div>
    </div>
  );
}

function Sidebar({ showAddTask, onShowAddForm }) {
  return (
    <div className="sidebar">
      <h4>Actions</h4>
      <div>Filter tasks by...</div>
      <div>Current</div>
      <div>Completed</div>
      <div>Important</div>
      <div>None</div>
      <Button showAddTask={showAddTask} onClick={onShowAddForm}>
        sidebar-button
      </Button>
    </div>
  );
}

function TaskManager({ tasks, onCompleteTask }) {
  return (
    <div className="content">
      <Sortbar />
      <Tasklist tasks={tasks} onCompleteTask={onCompleteTask}>
        current
      </Tasklist>
      <Tasklist tasks={tasks} onCompleteTask={onCompleteTask}>
        important
      </Tasklist>
      <Tasklist tasks={tasks} onCompleteTask={onCompleteTask}>
        completed
      </Tasklist>
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

function Tasklist({ tasks, children, onCompleteTask }) {
  const filteredTasks = tasks.filter((tasks) => tasks.status === children);
  const numTasks = filteredTasks.length;

  return (
    <div className={children}>
      <TaskStatus numTasks={numTasks} name={children} />
      <ul>
        {filteredTasks.map((task) => (
          <TaskInfo task={task} key={task.id} onCompleteTask={onCompleteTask} />
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

function TaskInfo({ task, onCompleteTask }) {
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
      <p>{task.description}</p>
    </li>
  );
}

function AddForm({ id, onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const currentDate = new Date();
  const selectedDate = new Date(date + "T00:00:00");
  const deadline = Math.floor(
    (selectedDate.setHours(0, 0, 0, 0) - currentDate.setHours(0, 0, 0, 0)) /
      (1000 * 60 * 60 * 24)
  );
  let status = "";

  if (deadline > 1) {
    status = "current";
  } else if (deadline === 1 || deadline === 0) {
    status = "important";
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !description || !date) return;

    const newTask = {
      id,
      title,
      description,
      deadline,
      status,
    };
    onAddTask(newTask);
  }

  return (
    <form className="form-add-task" onSubmit={handleSubmit}>
      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <label>Description</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <label>Due Date</label>
      <input
        type="date"
        value={date}
        min={new Date(Date.now() - 86400000).toISOString().split("T")[0]}
        onChange={(e) => setDate(e.target.value)}
      ></input>
      <Button>form-button</Button>
    </form>
  );
}

function Button({ showAddTask, onClick, children }) {
  return (
    <button className={children} onClick={onClick}>
      {showAddTask ? "Close Form" : "Add Task"}
    </button>
  );
}
