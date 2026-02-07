import React, { useState } from "react";
import "./Ai.css";
import chatai from "../../assets/chatai.png";

const AIAssistantCard: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [closing, setClosing] = useState(false);

  const closeChat = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 300); // must match CSS animation duration
  };

  return (
    <>
      {!open && (
        <button
          className="aiArrowOpen"
          onClick={() => setOpen(true)}
          aria-label="Open AI Assistant"
        ></button>
      )}

      {open && (
        <section className={`aiCard ${closing ? "aiClosing" : ""}`}>
          <div className="aiHeader">
            <span className="aiIcon">
              <img src={chatai} alt="AI Assistant Icon" className="chatai" />
            </span>
            <span>Logistics AI Assistant</span>

            <button
              className="aiArrowBtn aiArrowClose"
              onClick={closeChat}
              aria-label="Close AI Assistant"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-eye-closed-icon lucide-eye-closed"
              >
                <path d="m15 18-.722-3.25" />
                <path d="M2 8a10.645 10.645 0 0 0 20 0" />
                <path d="m20 15-1.726-2.05" />
                <path d="m4 15 1.726-2.05" />
                <path d="m9 18 .722-3.25" />
              </svg>
            </button>
          </div>

          <div className="aiBubble">
            Hello! I can help you analyze gate throughput and truck arrivals.
            What would you like to know?
          </div>

          <div className="aiSuggestions">
            <button className="aiChip">
              "How many trucks at Gate 1 between 10–12?"
            </button>
            <button className="aiChip">
              "Predict congestion for Gate 3 at 15:00"
            </button>
          </div>

          <div className="aiInputRow">
            <input className="aiInput" placeholder="Ask AI anything..." />
            <button className="aiSend">➤</button>
          </div>

          <div className="aiFooter">Node: US-EAST-01 • v2.4.12-PRO</div>
        </section>
      )}
    </>
  );
};

export default AIAssistantCard;
