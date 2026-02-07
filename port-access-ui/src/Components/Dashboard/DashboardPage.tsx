import React from "react";

import NextBooking from "../NextBooking/NextBookingCard";
import QuickSlotBooking from "../QuickSlot/QuickSlotBooking";

type Stat = {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: "up" | "down" | "neutral";
};

const stats: Stat[] = [
  { label: "ACTIVE GATES", value: "18/24", delta: "↗ 4%", deltaTone: "up" },
  {
    label: "AVG. WAIT TIME",
    value: "14.2m",
    delta: "↗ 1.5m",
    deltaTone: "down",
  },
  { label: "THROUGHPUT", value: "142 tph", delta: "Target", deltaTone: "up" },
  {
    label: "CONFIRMED SLOTS",
    value: "89%",
    delta: "Utilization",
    deltaTone: "neutral",
  },
];

type AlertType = "urgent" | "info" | "warning";

type Alert = {
  type: AlertType;
  title: string;
  time: string;
  message: string;
  actions?: boolean;
};

const alerts: Alert[] = [
  {
    type: "urgent",
    title: "URGENT: Gate 2 Full",
    time: "12:44:02",
    message:
      "Congestion detected. 4 trucks in queue exceeding capacity threshold.",
    actions: true,
  },
  {
    type: "info",
    title: "Gate 4: Truck Arrival",
    time: "12:42:15",
    message: "Carrier: DHL Express (SL-4922) arrived at Gate 04.",
  },
  {
    type: "info",
    title: "Gate 1: Slot Released",
    time: "12:39:58",
    message: "Truck (MA-0911) exited Gate 01. Slot now available.",
  },
  {
    type: "warning",
    title: "Near Saturation: Gate 3",
    time: "12:35:10",
    message: "Gate 3 approaching 85% capacity for the 13:00 window.",
  },
  // add more to see scroll behavior
  {
    type: "info",
    title: "Gate 2: Arrival",
    time: "12:31:02",
    message: "Carrier: UPS (UP-7781) arrived at Gate 02.",
  },
  {
    type: "warning",
    title: "Near Saturation: Gate 1",
    time: "12:28:44",
    message: "Gate 1 is trending above 80% for upcoming window.",
  },
];

const DashboardPage: React.FC = () => {
  return (
    <div className="page">
      {/* Topbar (simple placeholder) */}
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
          <a className="nav-item active">Dashboard</a>
          <a className="nav-item">Gate Management</a>
          <a className="nav-item">Forecasting</a>
          <a className="nav-item">Reports</a>
        </nav>

        <div className="topbar-right">
          <input className="search" placeholder="Search gates, trucks..." />
          <button className="icon-btn" aria-label="Notifications">
            🔔
          </button>
          <button className="icon-btn" aria-label="Settings">
            ⚙️
          </button>
          <div className="avatar">K</div>
        </div>
      </header>

      {/* Body is fixed height; inner sections scroll independently */}
      <div className="body">
        {/* Middle section: scrolls independently */}
        <main className="mainScroll">
          {/*NextBookingCard*/}
          <NextBooking />
          {/* Stats row */}
          <div className="statsRow">
            {stats.map((s) => (
              <div className="statCard" key={s.label}>
                <div className="statLabel">{s.label}</div>
                <div className="statValueRow">
                  <div className="statValue">{s.value}</div>
                  {s.delta && (
                    <div className={`statDelta ${s.deltaTone ?? "neutral"}`}>
                      {s.delta}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/*quicSlot*/}
          <QuickSlotBooking />

          {/* Heatmap card */}
          <section className="card">
            <div className="cardHeader">
              <div className="cardTitle">
                <span className="sqIcon" /> Gate Saturation Heatmap
              </div>
              <div className="legend">
                <span className="pillLegend">
                  <span className="dotLegend open" />
                  Open
                </span>
                <span className="pillLegend">
                  <span className="dotLegend near" />
                  Near Full
                </span>
                <span className="pillLegend">
                  <span className="dotLegend full" />
                  Full
                </span>
                <span className="pillLegend">
                  <span className="dotLegend closed" />
                  Closed
                </span>
                <button className="dropdown">Last 12 Hours ▾</button>
              </div>
            </div>

            <div className="heatmap">
              <div className="heatmapHead">
                <div className="heatmapLeftHead">GATE / TIME</div>
                {[
                  "08:00",
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00",
                  "13:00",
                  "14:00",
                  "15:00",
                  "16:00",
                  "17:00",
                  "18:00",
                  "19:00",
                ].map((t) => (
                  <div key={t} className="heatTime">
                    {t}
                  </div>
                ))}
              </div>

              {["Gate 01", "Gate 02", "Gate 03", "Gate 04"].map((g, idx) => (
                <div className="heatRow" key={g}>
                  <div className="heatGate">{g}</div>
                  {Array.from({ length: 12 }).map((_, c) => {
                    // demo pattern similar vibe
                    const cls =
                      idx === 0
                        ? c === 2
                          ? "near"
                          : c === 3 || c === 4
                            ? "full"
                            : "open"
                        : idx === 1
                          ? c < 3
                            ? "full"
                            : c < 6
                              ? "near"
                              : c < 9
                                ? "closed"
                                : "open"
                          : idx === 2
                            ? c < 2
                              ? "closed"
                              : c < 4
                                ? "open"
                                : c < 6
                                  ? "near"
                                  : c < 9
                                    ? "full"
                                    : c === 9
                                      ? "near"
                                      : "open"
                            : c < 2
                              ? "closed"
                              : c < 6
                                ? "open"
                                : c < 8
                                  ? "near"
                                  : "open";

                    return <div key={c} className={`heatCell ${cls}`} />;
                  })}
                </div>
              ))}
            </div>
          </section>

          {/* bottom space like screenshot */}
          <div className="mainSpacer" />
        </main>

        {/* Right column: alerts scroll, AI assistant fixed (not scroll) */}
        <aside className="rightCol">
          <section className="eventsCard">
            <div className="eventsHeader">
              <div className="eventsTitle">
                <span className="eventsDot" />
                EVENTS & ALERTS
              </div>
              <span className="liveBadge">LIVE</span>
            </div>

            {/* Only THIS scrolls */}
            <div className="alertsScroll">
              {alerts.map((a, i) => (
                <div className={`alert ${a.type}`} key={`${a.title}-${i}`}>
                  <div className="alertTop">
                    <div className="alertTitle">{a.title}</div>
                    <div className="alertTime">{a.time}</div>
                  </div>
                  <div className="alertMsg">{a.message}</div>

                  {a.actions && (
                    <div className="alertActions">
                      <button className="btnRed">REDIRECT</button>
                      <button className="btnDark">DISMISS</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* AI assistant does NOT scroll (fixed within right column) */}
          <section className="aiCard">
            <div className="aiHeader">
              <span className="aiIcon">🤖</span> Logistics AI Assistant
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
              <button className="aiSend" aria-label="Send">
                ➤
              </button>
            </div>

            <div className="aiFooter">Node: US-EAST-01 • v2.4.12-PRO</div>
          </section>
        </aside>
      </div>

      {/* Footer strip */}
      <footer className="footer">
        <span className="dotOk" /> System Online
        <span className="sep" />
        DB Sync: 0.2ms
      </footer>
    </div>
  );
};

export default DashboardPage;
