export default function Sortbar({ sortBy, onSort }) {
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
