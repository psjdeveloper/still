import { useState } from "react";
import Setup from "./components/Setup";
import Session from "./components/Session";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [task, setTask] = useState("");
  const [time, setTime] = useState(0);
  const [started, setStarted] = useState(false);

  const [stats, setStats] = useState(() => {
    return JSON.parse(localStorage.getItem("stats")) || {
      total: 0,
      completed: 0
    };
  });

  const [streak, setStreak] = useState(
    parseInt(localStorage.getItem("streak")) || 0
  );

  const startSession = (taskInput, minutes) => {
    if (!taskInput || !minutes) return alert("Enter task & time");

    setTask(taskInput);
    setTime(minutes * 60);
    setStarted(true);

    document.documentElement.requestFullscreen();
  };

  const endSession = (completed = false) => {
    document.exitFullscreen();

    const newStats = {
      total: stats.total + 1,
      completed: stats.completed + (completed ? 1 : 0)
    };

    localStorage.setItem("stats", JSON.stringify(newStats));
    setStats(newStats);

    const newStreak = completed ? streak + 1 : 0;
    localStorage.setItem("streak", newStreak);
    setStreak(newStreak);

    setStarted(false);
    setTask("");
    setTime(0);
  };

  const integrity = stats.total
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;

  const breaks = JSON.parse(localStorage.getItem("breaks")) || [];
  const avgBreak =
    breaks.length > 0
      ? Math.round(breaks.reduce((a, b) => a + b, 0) / breaks.length)
      : 0;

  return (
    <div className="container py-5">

      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="fw-bold">Focus Tracker</h1>
      </div>

      {/* Stats Cards */}
      <div className="row text-center mb-4">

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-3">
            <h5>Integrity</h5>
            <h2 className="text-primary">{integrity}%</h2>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-3">
            <h5>Streak</h5>
            <h2 className="text-success">{streak}</h2>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-3">
            <h5>Avg Break</h5>
            <h2 className="text-danger">
              {Math.floor(avgBreak / 60)} min
            </h2>
          </div>
        </div>

      </div>

      {/* Main Section */}
      <div className="card shadow p-4">
        {!started ? (
          <Setup onStart={startSession} />
        ) : (
          <Session task={task} time={time} onEnd={endSession} />
        )}
      </div>

    </div>
  );
}

export default App;