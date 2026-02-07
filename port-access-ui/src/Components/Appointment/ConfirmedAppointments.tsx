// src/components/Appointments/ConfirmedAppointments.tsx
import React, { useMemo, useState } from "react";
import "./ConfirmedAppointments.css";

type TabKey = "upcoming" | "completed" | "canceled";

type AppointmentStatus = "CONFIRMED" | "PROCESSING";

type Appointment = {
  id: string;
  status: AppointmentStatus;
  date: string;
  gate: string;
  timeWindow: string;
  durationMins: number;
  driver: string;
  qrState: "ready" | "pending";
};

const ConfirmedAppointments: React.FC = () => {
  const [tab, setTab] = useState<TabKey>("upcoming");

  const [smsAlerts, setSmsAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const appointments: Appointment[] = useMemo(
    () => [
      {
        id: "RDV-77492-X",
        status: "CONFIRMED",
        date: "Oct 24, 2023",
        gate: "Gate 04",
        timeWindow: "10:20 — 10:30",
        durationMins: 10,
        driver: "Mark Thompson",
        qrState: "ready",
      },
      {
        id: "RDV-81203-A",
        status: "PROCESSING",
        date: "Oct 24, 2023",
        gate: "Gate 02",
        timeWindow: "11:45 — 12:00",
        durationMins: 15,
        driver: "Sarah Jenkins",
        qrState: "pending",
      },
    ],
    [],
  );

  return (
    <div className="ca-page">
      <div className="ca-wrap">
        {/* Header */}

        <div className="ca-header">
          <div>
            <h1 className="ca-title">Confirmed Appointments</h1>
            <p className="ca-subtitle">
              View and manage your upcoming gate entry slots and QR credentials.
            </p>
          </div>

          <button className="ca-bookBtn" type="button">
            <span className="ca-plus">＋</span> Book New Slot
          </button>
        </div>

        {/* Tabs */}
        <div className="ca-tabs">
          <button
            className={`ca-tab ${tab === "upcoming" ? "is-active" : ""}`}
            onClick={() => setTab("upcoming")}
            type="button"
          >
            Upcoming (3)
          </button>
          <button
            className={`ca-tab ${tab === "completed" ? "is-active" : ""}`}
            onClick={() => setTab("completed")}
            type="button"
          >
            Completed
          </button>
          <button
            className={`ca-tab ${tab === "canceled" ? "is-active" : ""}`}
            onClick={() => setTab("canceled")}
            type="button"
          >
            Canceled
          </button>
          <div className="ca-tabLine" />
        </div>

        <div className="ca-grid">
          {/* Left column: cards */}
          <section className="ca-left">
            {appointments.map((a) => (
              <AppointmentCard key={a.id} appt={a} />
            ))}
          </section>

          {/* Right column: panels */}
          <aside className="ca-right">
            <div className="ca-panel">
              <div className="ca-panelHead">
                <BellIcon className="ca-panelIcon" />
                <div className="ca-panelTitle">Stay Updated</div>
              </div>

              <div className="ca-panelBlock">
                <div className="ca-panelLabel">RDV Confirmation</div>

                <ToggleRow
                  icon={<ChatIcon className="ca-rowIcon" />}
                  label="SMS Alerts"
                  checked={smsAlerts}
                  onChange={setSmsAlerts}
                />
                <ToggleRow
                  icon={<ChatIcon className="ca-rowIcon" />}
                  label="WhatsApp Notification"
                  checked={whatsappAlerts}
                  onChange={setWhatsappAlerts}
                />
              </div>

              <div className="ca-panelDivider" />

              <div className="ca-panelBlock">
                <div className="ca-panelLabel">RDV Cancellations</div>

                <ToggleRow
                  icon={<MailIcon className="ca-rowIcon" />}
                  label="Email Alerts"
                  checked={emailAlerts}
                  onChange={setEmailAlerts}
                />
              </div>

              <button className="ca-panelBtn" type="button">
                Update Preferences
              </button>
            </div>

            <div className="ca-policy">
              <div className="ca-policyHead">
                <InfoIcon className="ca-policyIcon" />
                <div className="ca-policyTitle">Gate Entry Policy</div>
              </div>

              <ul className="ca-policyList">
                <li>Arrive at least 10 mins before your slot.</li>
                <li>QR code must be ready for scanning.</li>
                <li>Valid ID required for all drivers.</li>
                <li>No trailer unhooking in Zone B.</li>
              </ul>

              <button className="ca-policyBtn" type="button">
                View Manual
              </button>

              <div className="ca-policyMark" aria-hidden="true">
                i
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ConfirmedAppointments;

/* ---------------- Components ---------------- */

const AppointmentCard: React.FC<{ appt: Appointment }> = ({ appt }) => {
  const badgeTone = appt.status === "CONFIRMED" ? "green" : "blue";

  return (
    <div className="ca-card">
      <div className="ca-cardLeft">
        <div className={`ca-badge ca-badge--${badgeTone}`}>{appt.status}</div>

        <div className="ca-rdv">{appt.id}</div>

        <div className="ca-metaRow">
          <div className="ca-metaBlock">
            <div className="ca-metaLabel">TIME WINDOW</div>
            <div className="ca-metaValue">
              {appt.timeWindow}{" "}
              <span className="ca-metaDim">({appt.durationMins} mins)</span>
            </div>
          </div>

          <div className="ca-metaSplit" />

          <div className="ca-metaBlock">
            <div className="ca-metaLabel">DRIVER</div>
            <div className="ca-metaValue">{appt.driver}</div>
          </div>
        </div>

        <div className="ca-actions">
          {appt.status === "CONFIRMED" ? (
            <>
              <button className="ca-btn" type="button">
                <PrintIcon className="ca-btnIcon" />
                Print Pass
              </button>
              <button className="ca-btn" type="button">
                <DownloadIcon className="ca-btnIcon" />
                PDF
              </button>
              <button className="ca-x" type="button" title="Cancel">
                ✕
              </button>
            </>
          ) : (
            <button className="ca-btnWide" type="button">
              Pass Details
              <LockIcon className="ca-lock" />
            </button>
          )}
        </div>
      </div>

      <div className="ca-cardRight">
        <div className="ca-rightTop">
          <div className="ca-date">{appt.date}</div>
          <div className="ca-gate">{appt.gate}</div>
        </div>

        <div className="ca-qrWrap">
          <div
            className={`ca-qr ${appt.qrState === "pending" ? "is-blur" : ""}`}
          >
            <div className="ca-qrInner">
              <div className="ca-qrFake">
                <div className="ca-qrSquares" />
              </div>
            </div>
          </div>

          {appt.qrState === "ready" ? (
            <div className="ca-qrHint">SCAN AT {appt.gate.toUpperCase()}</div>
          ) : (
            <div className="ca-qrPill">PENDING VERIFICATION</div>
          )}
        </div>
      </div>
    </div>
  );
};

const ToggleRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}> = ({ icon, label, checked, onChange }) => {
  return (
    <div className="ca-toggleRow">
      <div className="ca-toggleLeft">
        <div className="ca-rowIconWrap">{icon}</div>
        <div className="ca-rowLabel">{label}</div>
      </div>

      <button
        className={`ca-switch ${checked ? "is-on" : ""}`}
        type="button"
        onClick={() => onChange(!checked)}
        aria-pressed={checked}
      >
        <span className="ca-switchKnob" />
      </button>
    </div>
  );
};

/* ---------------- Icons (inline SVG) ---------------- */

const BellIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 22a2.2 2.2 0 0 0 2.2-2.2H9.8A2.2 2.2 0 0 0 12 22Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M18 9a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const ChatIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M21 14a4 4 0 0 1-4 4H8l-5 3V6a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M7 8h10M7 12h7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const MailIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 6h16v12H4V6Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="m4 7 8 6 8-6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M12 10.8v5.2"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M12 8.2h.01"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const PrintIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M7 8V4h10v4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M7 17h10v3H7v-3Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M6 10h12a3 3 0 0 1 3 3v3h-4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M6 16H3v-3a3 3 0 0 1 3-3"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 3v10"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M8.5 10.5 12 13.9l3.5-3.4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 14v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const LockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M7 11V8a5 5 0 0 1 10 0v3"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M6 11h12v10H6V11Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);
