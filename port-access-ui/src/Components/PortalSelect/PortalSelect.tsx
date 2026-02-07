// src/components/Auth/PortalSelect.tsx
import React from "react";

const PortalSelect: React.FC = () => {
  return (
    <div className="ps-page">
      {/* Top brand */}
      <header className="ps-top">
        <div className="ps-brand">
          <LogoMark className="ps-logo" />
          <div className="ps-brandName">GateCentral</div>
        </div>
      </header>

      {/* Main */}
      <main className="ps-main">
        <h1 className="ps-title">Welcome back</h1>
        <p className="ps-subtitle">
          Select your portal to manage logistics operations
        </p>

        <div className="ps-grid">
          <PortalCard
            icon={<TruckIcon className="ps-cardIcon" />}
            title="Carriers"
            desc="Manage your fleet, schedule gate appointments, and track driver arrival statuses in real-time."
            onClick={() => {}}
          />
          <PortalCard
            icon={<GridPlusIcon className="ps-cardIcon" />}
            title="Operators"
            desc="Monitor yard activity, authorize gate entries, and optimize warehouse throughput with advanced analytics."
            onClick={() => {}}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="ps-footer">
        <div className="ps-footerLeft">
          © 2024 GateCentral Logistics Systems. All rights reserved.
        </div>

        <div className="ps-footerRight">
          <a className="ps-footLink" href="#">
            Support
          </a>
          <span className="ps-dot" aria-hidden="true" />
          <a className="ps-footLink" href="#">
            <span className="ps-greenDot" /> System Status
          </a>
          <a className="ps-footLink" href="#">
            Terms of Service
          </a>
          <a className="ps-footLink" href="#">
            Privacy
          </a>
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
    <div className="ps-card">
      <div className="ps-cardInner">
        <div className="ps-iconWrap">{icon}</div>

        <div className="ps-cardTitle">{title}</div>
        <div className="ps-cardDesc">{desc}</div>

        <button className="ps-btn" type="button" onClick={onClick}>
          Login / Sign Up <span className="ps-arrow">→</span>
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
