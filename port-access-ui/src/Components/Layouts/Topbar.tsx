import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const Topbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Detect portal type from current path
  const isCarrierPortal = location.pathname.startsWith("/carrier");

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-50 bg-[#0b141f]/95 backdrop-blur-lg border-b border-white/8">
      <header className="flex items-center justify-between px-4 md:px-6 h-16 max-w-[1400px] mx-auto gap-4 md:gap-6">
        {/* Left: Logo & Brand */}
        <Link
          to={isCarrierPortal ? "/carrier/dashboard" : "/operator/dashboard"}
          className="flex items-center gap-3 min-w-[140px] md:min-w-[200px]"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center font-black text-white text-base shadow-lg">
            {isCarrierPortal ? "OC" : "OP"}
          </div>
          <div className="flex flex-col gap-0.5 max-md:hidden">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-sky-400">
                {isCarrierPortal ? "OpsControl" : "OpsPortal"}
              </span>
              <span className="text-xs text-sky-600">
                {isCarrierPortal ? "Logistics" : "Operations"}
              </span>
            </div>
            <div className="mt-0.5 text-[11px] text-white/50 tracking-wide max-lg:hidden">
              {isCarrierPortal
                ? "CARRIER PORTAL • LIVE"
                : "OPERATOR PORTAL • LIVE"}
            </div>
          </div>
        </Link>

        {/* Center: Navigation */}
        <nav className="flex gap-4 md:gap-6 flex-1 max-md:hidden">
          {isCarrierPortal ? (
            <>
              <Link
                to="/carrier/dashboard"
                className={`text-sm pb-1.5 cursor-pointer transition-all whitespace-nowrap ${
                  isActive("/carrier/dashboard")
                    ? "text-white border-b-2 border-sky-500"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/carrier/pending"
                className={`text-sm pb-1.5 cursor-pointer transition-all whitespace-nowrap ${
                  isActive("/carrier/pending")
                    ? "text-white border-b-2 border-sky-500"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Appointments
              </Link>
              <Link
                to="/carrier/control"
                className={`text-sm pb-1.5 cursor-pointer transition-all whitespace-nowrap ${
                  isActive("/carrier/control")
                    ? "text-white border-b-2 border-sky-500"
                    : "text-white/60 hover:text-white"
                }`}
              >
                New Request
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/operator/dashboard"
                className={`text-sm pb-1.5 cursor-pointer transition-all whitespace-nowrap ${
                  isActive("/operator/dashboard")
                    ? "text-white border-b-2 border-sky-500"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Dashboard
              </Link>
              <a
                href="#"
                className="text-sm pb-1.5 cursor-pointer transition-all whitespace-nowrap text-white/60 hover:text-white"
              >
                Gate Management
              </a>
              <a
                href="#"
                className="text-sm pb-1.5 cursor-pointer transition-all whitespace-nowrap text-white/60 hover:text-white"
              >
                Reports
              </a>
            </>
          )}
        </nav>

        {/* Right: Search & Actions */}
        <div className="flex items-center gap-2 md:gap-2.5">
          <input
            className="w-32 md:w-44 lg:w-64 bg-[#121c2f] border border-white/10 rounded-lg px-3 py-2 text-white outline-none text-xs md:text-[13px] transition-all placeholder:text-white/40 focus:border-sky-500 focus:bg-[#1a2535] max-sm:hidden"
            placeholder="Search..."
          />
          <button
            className="bg-transparent border border-white/10 rounded-lg w-9 h-9 flex items-center justify-center cursor-pointer text-lg transition-all text-white/60 hover:bg-sky-500/10 hover:border-sky-500 hover:text-sky-400"
            aria-label="Notifications"
          >
            🔔
          </button>
          <button
            onClick={handleLogout}
            className="bg-transparent border border-white/10 rounded-lg w-9 h-9 flex items-center justify-center cursor-pointer text-lg transition-all text-white/60 hover:bg-red-500/10 hover:border-red-500 hover:text-red-400"
            aria-label="Logout"
            title="Logout"
          >
            🚪
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="flex gap-2 px-4 pb-2 md:hidden border-t border-white/5 pt-2">
        {isCarrierPortal ? (
          <>
            <Link
              to="/carrier/dashboard"
              className={`flex-1 text-center text-xs pb-1 cursor-pointer transition-all ${
                isActive("/carrier/dashboard")
                  ? "text-white border-b-2 border-sky-500"
                  : "text-white/60"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/carrier/pending"
              className={`flex-1 text-center text-xs pb-1 cursor-pointer transition-all ${
                isActive("/carrier/pending")
                  ? "text-white border-b-2 border-sky-500"
                  : "text-white/60"
              }`}
            >
              Appointments
            </Link>
            <Link
              to="/carrier/control"
              className={`flex-1 text-center text-xs pb-1 cursor-pointer transition-all ${
                isActive("/carrier/control")
                  ? "text-white border-b-2 border-sky-500"
                  : "text-white/60"
              }`}
            >
              New Request
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/operator/dashboard"
              className={`flex-1 text-center text-xs pb-1 cursor-pointer transition-all ${
                isActive("/operator/dashboard")
                  ? "text-white border-b-2 border-sky-500"
                  : "text-white/60"
              }`}
            >
              Dashboard
            </Link>
            <a
              href="#"
              className="flex-1 text-center text-xs pb-1 cursor-pointer transition-all text-white/60"
            >
              Gates
            </a>
            <a
              href="#"
              className="flex-1 text-center text-xs pb-1 cursor-pointer transition-all text-white/60"
            >
              Reports
            </a>
          </>
        )}
      </nav>
    </div>
  );
};

export default Topbar;
