import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const Topbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    // Get user email from localStorage
    const email = localStorage.getItem("userEmail");
    setUserEmail(email);
  }, []);

  // Detect portal type from current path
  const isCarrierPortal = location.pathname.startsWith("/carrier");

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");

    // Navigate to login
    navigate("/login");
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
                to="/carrier/appointments"
                className={`text-sm pb-1.5 cursor-pointer transition-all whitespace-nowrap ${
                  isActive("/carrier/appointments")
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
              <Link
                to="/operator/pending"
                className={`text-sm pb-1.5 cursor-pointer transition-all whitespace-nowrap ${
                  isActive("/operator/pending")
                    ? "text-white border-b-2 border-sky-500"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Pending Requests
              </Link>
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

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-lg w-9 h-9 flex items-center justify-center cursor-pointer text-sm font-bold transition-all text-white hover:shadow-lg hover:shadow-sky-500/30 max-md:hidden"
              aria-label="User Menu"
            >
              {userEmail ? userEmail.charAt(0).toUpperCase() : "U"}
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-[#121c2f] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                <div className="p-4 border-b border-white/10">
                  <div className="text-xs text-white/50 mb-1">Signed in as</div>
                  <div className="text-sm font-semibold text-white truncate">
                    {userEmail || "User"}
                  </div>
                  <div className="text-xs text-sky-400 mt-1">
                    {isCarrierPortal ? "Carrier Account" : "Operator Account"}
                  </div>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      alert("Profile settings coming soon!");
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-white/80 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    ⚙️ Account Settings
                  </button>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      alert("Help center coming soon!");
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-white/80 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    ❓ Help & Support
                  </button>
                </div>
                <div className="p-2 border-t border-white/10">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors font-semibold"
                  >
                    🚪 Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="bg-transparent border border-white/10 rounded-lg w-9 h-9 flex items-center justify-center cursor-pointer text-lg transition-all text-white/60 hover:bg-red-500/10 hover:border-red-500 hover:text-red-400 md:hidden"
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
              to="/carrier/appointments"
              className={`flex-1 text-center text-xs pb-1 cursor-pointer transition-all ${
                isActive("/carrier/appointments")
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
            <Link
              to="/operator/pending"
              className={`flex-1 text-center text-xs pb-1 cursor-pointer transition-all ${
                isActive("/operator/pending")
                  ? "text-white border-b-2 border-sky-500"
                  : "text-white/60"
              }`}
            >
              Pending
            </Link>
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
