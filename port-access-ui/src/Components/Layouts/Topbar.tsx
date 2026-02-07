import React from "react";
import { useLocation } from "react-router-dom";

const Topbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="sticky top-0 z-50 bg-[#0b141f]/95 backdrop-blur-lg border-b border-white/[0.08]">
      <header className="flex items-center justify-between px-6 h-16 max-w-[1400px] mx-auto gap-6">
        {/* Left: Logo & Brand */}
        <div className="flex items-center gap-3 min-w-[200px]">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4da3ff] to-[#1f6fff] flex items-center justify-center font-black text-white text-base shadow-lg">
            OC
          </div>
          <div className="flex flex-col gap-0.5 max-md:hidden">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#4da3ff]">
                OpsControl
              </span>
              <span className="text-xs text-[#1f6fff]">Logistics</span>
            </div>
            <div className="mt-0.5 text-[11px] text-[#8fa3bf] tracking-wide max-lg:hidden">
              TERMINAL A1 • LIVE OPERATIONS
            </div>
          </div>
        </div>

        {/* Center: Navigation */}
        <nav className="flex gap-6 flex-1 max-md:hidden">
          <a
            href="/"
            className={`text-sm pb-1.5 cursor-pointer transition-all whitespace-nowrap ${
              isActive("/") || isActive("/CarrierDashboard")
                ? "text-white border-b-2 border-[#1f6fff]"
                : "text-[#a8b3c7] hover:text-white"
            }`}
          >
            Dashboard
          </a>
          <a
            href="/pending"
            className={`text-sm pb-1.5 cursor-pointer transition-all whitespace-nowrap ${
              isActive("/pending")
                ? "text-white border-b-2 border-[#1f6fff]"
                : "text-[#a8b3c7] hover:text-white"
            }`}
          >
            Pending Requests
          </a>
          <a
            href="/control"
            className={`text-sm pb-1.5 cursor-pointer transition-all whitespace-nowrap ${
              isActive("/control")
                ? "text-white border-b-2 border-[#1f6fff]"
                : "text-[#a8b3c7] hover:text-white"
            }`}
          >
            Control Panel
          </a>
        </nav>

        {/* Right: Search & Actions */}
        <div className="flex items-center gap-2.5">
          <input
            className="w-64 bg-[#121c2f] border border-[#1e2a3a] rounded-lg px-3 py-2 text-white outline-none text-[13px] transition-all placeholder:text-[#7f8da3] focus:border-[#4da3ff] focus:bg-[#1a2535] max-lg:w-44 max-md:hidden"
            placeholder="Search..."
          />
          <button
            className="bg-transparent border border-white/10 rounded-lg w-9 h-9 flex items-center justify-center cursor-pointer text-lg transition-all text-[#a8b3c7] hover:bg-[#4da3ff]/10 hover:border-[#4da3ff] hover:text-[#4da3ff]"
            aria-label="Notifications"
          >
            🔔
          </button>
          <button
            className="bg-transparent border border-white/10 rounded-lg w-9 h-9 flex items-center justify-center cursor-pointer text-lg transition-all text-[#a8b3c7] hover:bg-[#4da3ff]/10 hover:border-[#4da3ff] hover:text-[#4da3ff]"
            aria-label="User profile"
          >
            👤
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="flex gap-3 px-4 pb-2 md:hidden border-t border-white/5 pt-2">
        <a
          href="/"
          className={`flex-1 text-center text-xs pb-1 cursor-pointer transition-all ${
            isActive("/") || isActive("/CarrierDashboard")
              ? "text-white border-b-2 border-[#1f6fff]"
              : "text-[#a8b3c7]"
          }`}
        >
          Dashboard
        </a>
        <a
          href="/pending"
          className={`flex-1 text-center text-xs pb-1 cursor-pointer transition-all ${
            isActive("/pending")
              ? "text-white border-b-2 border-[#1f6fff]"
              : "text-[#a8b3c7]"
          }`}
        >
          Pending
        </a>
        <a
          href="/control"
          className={`flex-1 text-center text-xs pb-1 cursor-pointer transition-all ${
            isActive("/control")
              ? "text-white border-b-2 border-[#1f6fff]"
              : "text-[#a8b3c7]"
          }`}
        >
          Control
        </a>
      </nav>
    </div>
  );
};

export default Topbar;
