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

function Sidebar({ onShowAddTask, onShowAddForm, onFilter, filter }) {
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

function TaskManager({ tasks, filter, onCompleteTask, onDeleteTask }) {
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

function Sortbar({ sortBy, onSort }) {
  return (
    <div className="sortbar">
      <label>Sort By:</label>
      <ul>
        <li
          className={sortBy === "id" ? "selected" : null}
          onClick={() => onSort("id")}
        >
          Task Number
        </li>
        <li
          className={sortBy === "deadline" ? "selected" : null}
          onClick={() => onSort("deadline")}
        >
          Deadlines
        </li>
      </ul>
    </div>
  );
}

function Tasklist({
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

function TaskStatus({ numTasks, name }) {
  return (
    <div className="task-header">
      {name === "current" ? "🟦" : name === "important" ? "🟨" : "🟪"} {name}
      <span>{numTasks}</span>
    </div>
  );
}

function TaskInfo({ task, onCompleteTask, onDeleteTask }) {
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

function AddForm({ onAddTask }) {
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
      <textarea
        rows="5"
        cols="30"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label>Due Date</label>
      <input
        type="date"
        value={date}
        min={new Date().toLocaleDateString("en-CA")}
        onChange={(e) => setDate(e.target.value)}
      ></input>
      <Button>form-button</Button>
    </form>
  );
}

function Button({ onShowAddTask, onClick, children }) {
  return (
    <button className={children} onClick={onClick}>
      {onShowAddTask ? "Close Form" : "Add Task"}
    </button>
  );
}
