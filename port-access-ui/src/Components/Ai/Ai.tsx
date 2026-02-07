import React, { useState } from "react";
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
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full border-none shadow-[0_12px_30px_rgba(0,0,0,0.45)] z-[9999] cursor-pointer transition-transform hover:scale-110"
          style={{
            backgroundImage: `url(${chatai})`,
            backgroundSize: "85%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#0ea5e9",
          }}
          onClick={() => setOpen(true)}
          aria-label="Open AI Assistant"
        />
      )}

      {open && (
        <section
          className={`fixed right-6 bottom-6 w-[360px] max-h-[520px] flex flex-col bg-[#0f1620]/95 border border-white/[0.08] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.55)] backdrop-blur-xl z-[9999] overflow-hidden transition-all duration-300 origin-bottom-right max-sm:left-3 max-sm:right-3 max-sm:w-auto max-sm:max-h-[70vh] ${
            closing ? "translate-y-[120%] scale-95 opacity-0" : ""
          }`}
        >
          <div className="flex items-center gap-2 px-4 py-3.5 font-black text-sm text-[#e7eef7] bg-gradient-to-b from-[rgba(0,140,255,0.18)] to-transparent border-b border-white/[0.06]">
            <span className="text-lg">
              <img
                src={chatai}
                alt="AI Assistant Icon"
                className="w-12 h-12 rounded-full"
              />
            </span>
            <span>Logistics AI Assistant</span>

            <button
              className="ml-auto bg-transparent border-none text-[#e7eef7]/65 text-base cursor-pointer p-1 hover:text-white transition-colors"
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-.722-3.25" />
                <path d="M2 8a10.645 10.645 0 0 0 20 0" />
                <path d="m20 15-1.726-2.05" />
                <path d="m4 15 1.726-2.05" />
                <path d="m9 18 .722-3.25" />
              </svg>
            </button>
          </div>

          <div className="p-3.5 my-3.5 mx-4 bg-white/[0.06] rounded-xl text-[13px] leading-relaxed text-[#e7eef7]/92 overflow-y-auto max-h-[180px]">
            Hello! I can help you analyze gate throughput and truck arrivals.
            What would you like to know?
          </div>

          <div className="flex flex-wrap gap-2 px-4 pb-3">
            <button className="px-3 py-2 rounded-full text-xs font-extrabold bg-[rgba(0,140,255,0.14)] border border-[rgba(0,140,255,0.28)] text-[#8fd0ff] cursor-pointer transition-all hover:bg-[rgba(0,140,255,0.22)] hover:-translate-y-0.5">
              "How many trucks at Gate 1 between 10–12?"
            </button>
            <button className="px-3 py-2 rounded-full text-xs font-extrabold bg-[rgba(0,140,255,0.14)] border border-[rgba(0,140,255,0.28)] text-[#8fd0ff] cursor-pointer transition-all hover:bg-[rgba(0,140,255,0.22)] hover:-translate-y-0.5">
              "Predict congestion for Gate 3 at 15:00"
            </button>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-3 mt-auto border-t border-white/[0.06] bg-black/20">
            <input
              className="flex-1 h-9 px-3 bg-white/[0.06] border border-white/[0.12] rounded-lg text-[#e7eef7] text-[13px] outline-none placeholder:text-[#e7eef7]/45"
              placeholder="Ask AI anything..."
            />
            <button className="w-9 h-9 rounded-lg bg-gradient-to-b from-[rgba(0,140,255,0.95)] to-[rgba(0,110,230,0.95)] border border-[rgba(0,140,255,0.35)] text-white font-black cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(0,140,255,0.35)]">
              ➤
            </button>
          </div>

          <div className="px-3.5 py-2 text-[11px] text-[#e7eef7]/45 text-right bg-black/25">
            Node: US-EAST-01 • v2.4.12-PRO
          </div>
        </section>
      )}
    </>
  );
};

export default AIAssistantCard;
