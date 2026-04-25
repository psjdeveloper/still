import { useEffect, useState } from "react";

function Session({ task, time, onEnd }) {
  const [timeLeft, setTimeLeft] = useState(time);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "quit" | "complete"
  const [modalMessage, setModalMessage] = useState("");

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
      const msg =
        messages.complete[Math.floor(Math.random() * messages.complete.length)];
      setModalType("complete");
      setModalMessage(msg);
      setShowModal(true);
    }
  }, [timeLeft]);

  const saveBreakPattern = () => {
    const data = JSON.parse(localStorage.getItem("breaks")) || [];
    data.push(timeLeft);
    localStorage.setItem("breaks", JSON.stringify(data));
  };

  const handleQuitClick = () => {
    setModalType("quit");
    setModalMessage("You're about to break your commitment.");
    setShowModal(true);
  };

  const confirmQuit = () => {
    saveBreakPattern();
    const msg =
      messages.quit[Math.floor(Math.random() * messages.quit.length)];
    setModalMessage(msg);
    setModalType("quitFinal");
  };

  const closeModal = () => {
    setShowModal(false);

    if (modalType === "complete") {
      onEnd(true);
    }

    if (modalType === "quitFinal") {
      onEnd(false);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center vh-100">

      <h4 className="text-muted mb-3">Current Task</h4>
      <h2 className="fw-bold mb-4">{task}</h2>

      <div className="card shadow-lg p-5 mb-4">
        <h1 className="display-1 fw-bold">
          {minutes}:{seconds < 10 ? "0" : ""}{seconds}
        </h1>
      </div>

      <button
        className="btn btn-outline-danger px-4 py-2 fw-semibold"
        onClick={handleQuitClick}
      >
        Quit Session
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center p-3">
              
              <div className="modal-header border-0">
                <h5 className="modal-title w-100">
                  {modalType === "complete"
                    ? "Session Complete"
                    : "Are you sure?"}
                </h5>
              </div>

              <div className="modal-body">
                <p className="fs-5">{modalMessage}</p>
              </div>

              <div className="modal-footer border-0 justify-content-center">
                {modalType === "quit" && (
                  <>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Continue
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={confirmQuit}
                    >
                      Quit Anyway
                    </button>
                  </>
                )}

                {(modalType === "complete" || modalType === "quitFinal") && (
                  <button
                    className="btn btn-primary"
                    onClick={closeModal}
                  >
                    OK
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {showModal && <div className="modal-backdrop fade show"></div>}

    </div>
  );
}

export default Session;