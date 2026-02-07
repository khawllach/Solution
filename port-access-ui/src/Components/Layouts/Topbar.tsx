import React from "react";
import "./Topbar.css";

const Topbar: React.FC = () => {
  return (
    <div className="topbar-wrapper">
      <header className="topbar">
        <div className="topbar-left">
          <div className="logo">OC</div>
          <div className="brand">
            <div className="brand-line">
              <span className="brand-name">OpsControl</span>
              <span className="brand-sub">Logistics</span>
            </div>
            <div className="brand-caption">TERMINAL A1 • LIVE OPERATIONS</div>
          </div>
        </div>

        <nav className="topbar-nav">
          <a href="/" className="nav-item active">
            Dashboard
          </a>
          <a href="/pending" className="nav-item">
            Pending Requests
          </a>
          <a href="/control" className="nav-item">
            Control Panel
          </a>
        </nav>

        <div className="topbar-right">
          <input className="search" placeholder="Search..." />
          <button className="icon-btn" aria-label="Notifications">
            🔔
          </button>
          <button className="icon-btn" aria-label="User profile">
            👤
          </button>
        </div>
      </header>
    </div>
  );
};

export default Topbar;
