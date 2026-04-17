import { useEffect, useState } from "react";

function Session({ task, time, onEnd }) {
  const [timeLeft, setTimeLeft] = useState(time);

  const messages = {
    quit: [
      "You chose comfort over intention.",
      "Pattern repeating.",
      "You are training inconsistency."
    ],
    complete: [
      "You stayed aligned.",
      "Expectation met reality.",
      "This builds your identity."
    ]
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      alert(
        messages.complete[Math.floor(Math.random() * messages.complete.length)]
      );
      onEnd(true);
    }
  }, [timeLeft]);

  const saveBreakPattern = () => {
    const data = JSON.parse(localStorage.getItem("breaks")) || [];
    data.push(timeLeft);
    localStorage.setItem("breaks", JSON.stringify(data));
  };

  const quit = () => {
    const confirmQuit = confirm("You are breaking your commitment.");

    if (confirmQuit) {
      saveBreakPattern();

      alert(
        messages.quit[Math.floor(Math.random() * messages.quit.length)]
      );

      onEnd(false);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center vh-100">

      {/* Task */}
      <h4 className="text-muted mb-3">Current Task</h4>
      <h2 className="fw-bold mb-4">{task}</h2>

      {/* Timer Card */}
      <div className="card shadow-lg p-5 mb-4">
        <h1 className="display-1 fw-bold">
          {minutes}:{seconds < 10 ? "0" : ""}{seconds}
        </h1>
      </div>

      {/* Quit Button */}
      <button
        className="btn btn-outline-danger px-4 py-2 fw-semibold"
        onClick={quit}
      >
        Quit Session
      </button>

    </div>
  );
}

export default Session;