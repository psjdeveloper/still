import { useState } from "react";

function Setup({ onStart }) {
  const [task, setTask] = useState("");
  const [minutes, setMinutes] = useState("");

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        
        <h3 className="text-center mb-4 fw-bold">Start Focus Session</h3>

        {/* Task Input */}
        <div className="mb-3">
          <label className="form-label">Task</label>
          <input
            type="text"
            className="form-control"
            placeholder="What are you working on?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>

        {/* Time Input */}
        <div className="mb-3">
          <label className="form-label">Duration (minutes)</label>
          <input
            type="number"
            className="form-control"
            placeholder="e.g. 25"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />
        </div>

        {/* Start Button */}
        <button
          className="btn btn-primary w-100 fw-semibold"
          onClick={() => onStart(task, minutes)}
        >
          Start Session
        </button>

      </div>
    </div>
  );
}

export default Setup;