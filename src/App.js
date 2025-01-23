export default function App() {
  return (
    <div className="app">
      <div className="header">
        <h2>Task Manager App</h2>
      </div>
      <div className="sidebar">
        <h4>Actions</h4>
        <div>Filter tasks by...</div>
        <div>Current</div>
        <div>Completed</div>
        <div>Important</div>
        <div>None</div>
        <button>Add New Task</button>
      </div>
      <div className="content">
        <div className="sortbar">
          <label>Sort By:</label>
          <span>Task Number</span>
          <span>Deadlines</span>
        </div>
        <div className="current">
          <div>
            🟦 Current <span>2</span>
          </div>
          <ul>
            <li>
              <div>
                <p>Task #1: Title</p>
                <div>
                  <span className="deadline">🕒 5 Days left</span>
                  <span className="delete-task">🗑️</span>
                  <span className="complete-task">✅</span>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. At iam
                decimum annum in spelunca iacet. Quamquam te quidem video minime
                esse deterritum. Neque enim disputari sine reprehensione nec cum
                iracundia aut pertinacia recte disputari potest. Itaque hic ipse
                iam pridem est reiectus; Duo Reges: constructio interrete.
                Expectoque quid ad id, quod quaerebam, respondeas
              </p>
            </li>
            <li>
              <div>
                <p>Task #2: Title</p>
                <div>
                  <span className="deadline">❗Due Today</span>
                  <span className="delete-task">🗑️</span>
                  <span className="complete-task">✅</span>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. At iam
                decimum annum in spelunca iacet. Quamquam te quidem video minime
                esse deterritum. Neque enim disputari sine reprehensione nec cum
                iracundia aut pertinacia recte disputari potest. Itaque hic ipse
                iam pridem est reiectus; Duo Reges: constructio interrete.
                Expectoque quid ad id, quod quaerebam, respondeas
              </p>
            </li>
          </ul>
        </div>
        <div className="important">
          <div>
            🟨 Important <span>1</span>
          </div>
          <ul>
            <li>
              <div>
                <p>Task #3: Title</p>
                <div>
                  <span className="deadline">⚠️1 Day left </span>
                  <span className="delete-task">🗑️</span>
                  <span className="complete-task">✅</span>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. At iam
                decimum annum in spelunca iacet. Quamquam te quidem video minime
                esse deterritum. Neque enim disputari sine reprehensione nec cum
                iracundia aut pertinacia recte disputari potest. Itaque hic ipse
                iam pridem est reiectus; Duo Reges: constructio interrete.
                Expectoque quid ad id, quod quaerebam, respondeas
              </p>
            </li>
          </ul>
        </div>
        <div className="completed">
          <div>
            🟪 Completed <span>1</span>
          </div>
          <ul>
            <li>
              <div>
                <p>Task #4: Title</p>
                <div>
                  <span className="deadline">✔️Done</span>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. At iam
                decimum annum in spelunca iacet. Quamquam te quidem video minime
                esse deterritum. Neque enim disputari sine reprehensione nec cum
                iracundia aut pertinacia recte disputari potest. Itaque hic ipse
                iam pridem est reiectus; Duo Reges: constructio interrete.
                Expectoque quid ad id, quod quaerebam, respondeas
              </p>
            </li>
          </ul>
        </div>
        <form className="form-add-task">
          <label>Title</label>
          <input type="text"></input>
          <label>Description</label>
          <input type="text"></input>
          <label>Due Date</label>
          <input type="date"></input>
          <button>Add Task</button>
        </form>
      </div>
      <div className="footer">©️ 2025 KN</div>
    </div>
  );
}
