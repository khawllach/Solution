// src/components/Auth/PortalSelect.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const PortalSelect: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070b14] via-[#0b141f] to-[#070b14] flex flex-col">
      {/* Top brand */}
      <header className="py-6 px-6 lg:px-12">
        <div className="flex items-center gap-3">
          <LogoMark className="w-10 h-10" />
          <div className="text-2xl font-black text-white tracking-tight">
            GateCentral
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 lg:px-12 py-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 text-center">
          Welcome back
        </h1>
        <p className="text-lg md:text-xl text-white/60 mb-12 text-center max-w-2xl">
          Select your portal to manage logistics operations
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <PortalCard
            icon={<TruckIcon className="w-12 h-12" />}
            title="Carriers"
            desc="Manage your fleet, schedule gate appointments, and track driver arrival statuses in real-time."
            onClick={() => navigate("/carrier-register")}
          />
          <PortalCard
            icon={<GridPlusIcon className="w-12 h-12" />}
            title="Operators"
            desc="Monitor yard activity, authorize gate entries, and optimize warehouse throughput with advanced analytics."
            onClick={() => navigate("/operator-register")}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 lg:px-12 border-t border-white/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="text-white/40">
            © 2026 GateCentral Logistics Systems. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-4 text-white/50">
            <a className="hover:text-white transition-colors" href="#">
              Support
            </a>
            <span
              className="w-1 h-1 rounded-full bg-white/30"
              aria-hidden="true"
            />
            <a
              className="flex items-center gap-2 hover:text-white transition-colors"
              href="#"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> System
              Status
            </a>
            <span
              className="w-1 h-1 rounded-full bg-white/30"
              aria-hidden="true"
            />
            <a className="hover:text-white transition-colors" href="#">
              Terms of Service
            </a>
            <span
              className="w-1 h-1 rounded-full bg-white/30"
              aria-hidden="true"
            />
            <a className="hover:text-white transition-colors" href="#">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortalSelect;

/* ---------------- Components ---------------- */

const PortalCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick?: () => void;
}> = ({ icon, title, desc, onClick }) => {
  return (
    <div
      className="group relative rounded-2xl bg-white/5 border border-white/10 p-8 hover:bg-white/8 hover:border-white/20 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-500/20 to-sky-600/20 flex items-center justify-center text-sky-400 mb-6 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>

        <div className="text-2xl font-bold text-white mb-3">{title}</div>
        <div className="text-white/60 mb-6 leading-relaxed">{desc}</div>

        <button
          className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold hover:from-sky-600 hover:to-sky-700 transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-sky-500/25"
          type="button"
        >
          Login / Sign Up{" "}
          <span className="text-xl transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </div>
  );
};

/* ---------------- Icons (inline SVG) ---------------- */

const LogoMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M14 2 26 14 14 26 2 14 14 2Z" fill="rgba(31,139,255,0.16)" />
    <path d="M14 5 23 14 14 23 5 14 14 5Z" fill="rgba(31,139,255,0.35)" />
    <path d="M14 8.2 19.8 14 14 19.8 8.2 14 14 8.2Z" fill="#1f8bff" />
  </svg>
);

const TruckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M3 7h11v9H3V7Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M14 10h4l3 3v3h-7v-9Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M18.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>
);

const GridPlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 4h7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <path
      d="M16.5 13v7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);
