import { useState } from "react";
import Button from "./Button";

export default function AddForm({ onAddTask }) {
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
