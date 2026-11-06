import { useState } from "react";
import "./App.css";

const Header = ({ theme, toggleTheme, userName }) => {
  return (
    <header className="app-header">
      <h2>ModernUI Dashboard</h2>

      <div className="header-actions">
        <span>Welcome, <strong>{userName}</strong></span>

        <button onClick={toggleTheme}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </header>
  );
};

const StatCard = ({ title, value, change, isPositive, icon }) => {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <span>{icon}</span>
        <span>{title}</span>
      </div>

      <div className="stat-body">
        <h3>{value}</h3>
        <span className={isPositive ? "positive" : "negative"}>
          {isPositive ? "▲" : "▼"} {change}
        </span>
      </div>
    </div>
  );
};

const TaskList = ({ tasks, onToggleTask, onDeleteTask }) => {
  return (
    <div className="task-container">
      <h3>Project Milestones</h3>

      <ul className="task-list">
        {tasks.length === 0 ? (
          <li>No active milestones found.</li>
        ) : (
          tasks.map((task) => (
            <li
              key={task.id}
              className={task.completed ? "completed" : ""}
            >
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleTask(task.id)}
                />
                <span>{task.title}</span>
              </label>

              <button onClick={() => onDeleteTask(task.id)}>
                X
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default function App() {
  const [theme, setTheme] = useState("light");
  const [taskInput, setTaskInput] = useState("");

  const [tasks, setTasks] = useState([
    { id: 1, title: "Design Component Wireframes", completed: true },
    { id: 2, title: "Build Responsive Layout System", completed: false },
    { id: 3, title: "Optimize Dark/Light Theme Switching", completed: false }
  ]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!taskInput.trim()) return;

    const newTask = {
      id: Date.now(),
      title: taskInput.trim(),
      completed: false
    };

    setTasks((prev) => [...prev, newTask]);
    setTaskInput("");
  };

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className={`app-root ${theme}`}>
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        userName="Alex Vance"
      />

      <main className="dashboard-content">
        <section className="stats-grid">
          <StatCard
            title="Total Revenue"
            value="$48,250"
            change="14.2%"
            isPositive={true}
            icon="💰"
          />

          <StatCard
            title="Active Sessions"
            value="2,840"
            change="8.6%"
            isPositive={true}
            icon="👥"
          />

          <StatCard
            title="Bounce Rate"
            value="21.4%"
            change="2.1%"
            isPositive={false}
            icon="📊"
          />
        </section>

        <section className="task-section">
          <form className="task-form" onSubmit={handleAddTask}>
            <input
              type="text"
              placeholder="Add a new milestone..."
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />

            <button type="submit">Add Task</button>
          </form>

          <TaskList
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        </section>
      </main>
    </div>
  );
}
