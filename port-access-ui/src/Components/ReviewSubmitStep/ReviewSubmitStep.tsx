// src/components/Pickups/ReviewSubmitStep.tsx
import React from "react";
import "./ReviewSubmitStep.css";

type StepState = "done" | "active" | "idle";

type StepItem = {
  title: string;
  subtitle: string;
  state: StepState;
};

const ReviewSubmitStep: React.FC = () => {
  const steps: StepItem[] = [
    { title: "Container Details", subtitle: "Completed", state: "done" },
    { title: "Driver Information", subtitle: "Completed", state: "done" },
    { title: "Review & Submit", subtitle: "Final Step", state: "active" },
  ];

  return (
    <div className="rs-page">
      <main className="rs-main">
        <div className="rs-breadcrumb">
          Pickups &nbsp;/&nbsp; Review &amp; Submit
        </div>

        <div className="rs-header">
          <h1 className="rs-title">Review &amp; Submit</h1>
          <p className="rs-subtitle">
            Please confirm the details of your pickup request before final
            submission.
          </p>
        </div>

        <div className="rs-layout">
          {/* Left rail */}
          <aside className="rs-left">
            <VerticalSteps items={steps} />
          </aside>

          {/* Center cards */}
          <section className="rs-center">
            <InfoCard
              icon={<BoxIcon className="rs-cardIcon" />}
              title="Container Details"
              onEdit={() => {}}
            >
              <div className="rs-kvGrid">
                <KV label="ISO Number" value="MSKU1234567" />
                <KV label="Type" value="40ft HC" />
                <KV label="Status" value={<Pill tone="blue" text="Laden" />} />
                <KV label="Reference" value={"BL-\n990823112"} />
              </div>
            </InfoCard>

            <InfoCard
              icon={<CalIcon className="rs-cardIcon" />}
              title="Appointment"
              onEdit={() => {}}
            >
              <div className="rs-kvGrid rs-kvGrid--2">
                <KV
                  label="Preferred Date"
                  value={
                    <div className="rs-inline">
                      <SmallCal className="rs-miniIcon" />
                      Monday, June 12, 2024
                    </div>
                  }
                />
                <KV
                  label="Preferred Window"
                  value={
                    <div className="rs-inline">
                      <Clock className="rs-miniIcon" />
                      08:00 - 10:00 (Morning)
                    </div>
                  }
                />
              </div>
            </InfoCard>

            <InfoCard
              icon={<Truck className="rs-cardIcon" />}
              title="Driver & Vehicle"
              onEdit={() => {}}
            >
              <div className="rs-driverRow">
                <div className="rs-avatar">
                  <User className="rs-miniIcon" />
                </div>

                <div className="rs-kvGrid rs-kvGrid--3">
                  <KV label="Driver Name" value={"Johnathon\nSmith"} />
                  <KV label="ID / License" value="CIN-8829-XP" />
                  <KV label="Plate Number" value="AA-123-BC" />
                </div>
              </div>
            </InfoCard>

            <div className="rs-warning">
              <div className="rs-warningTitle">
                <Warn className="rs-warningIcon" />
                Rules &amp; Important Warnings
              </div>

              <ul className="rs-warningList">
                <li>
                  <span className="rs-bullet" />
                  <b>Punctuality:</b> You must arrive within +/- 5 minutes of
                  your booked window. Late arrivals will be rejected.
                </li>
                <li>
                  <span className="rs-bullet" />
                  <b>No RDV = No Entry:</b> Physical presentation of the digital
                  booking QR code is mandatory at Gate 3.
                </li>
                <li>
                  <span className="rs-bullet" />
                  <b>PPE Requirements:</b> Driver must wear High-Viz vest and
                  safety shoes at all times inside terminal.
                </li>
              </ul>
            </div>

            <div className="rs-actions">
              <button className="rs-btn rs-btn--ghost" type="button">
                Back to Driver Details
              </button>

              <button className="rs-btn rs-btn--primary" type="button">
                Confirm &amp; Submit Request <span className="rs-arrow">➤</span>
              </button>
            </div>
          </section>

          {/* Right side */}
          <aside className="rs-right">
            <div className="rs-summary">
              <div className="rs-summaryTitle">LIVE SUMMARY</div>

              <div className="rs-sRow">
                <div className="rs-sLabel">STATUS</div>
                <Pill tone="green" text="READY TO BOOK" />
              </div>

              <div className="rs-sBlock">
                <div className="rs-sLabel">GATE TERMINAL</div>
                <div className="rs-sValue">Main Port Terminal 3</div>
              </div>

              <div className="rs-sBlock">
                <div className="rs-sLabel">ESTIMATED PROCESS</div>
                <div className="rs-eta">
                  <span className="rs-etaDot" />
                  <span>25 Minutes</span>
                </div>
              </div>

              <div className="rs-refBox">
                <div className="rs-refLabel">CARRIER REFERENCE</div>
                <div className="rs-refValue">CAR-2024-00982-A</div>
              </div>
            </div>

            <div className="rs-help">
              <div className="rs-helpTitle">Need Help?</div>
              <div className="rs-helpText">
                If you encounter any issues with the booking slot, contact
                Terminal 3 Support at +1 800-PORT-HELP
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default ReviewSubmitStep;

/* ---------------- UI bits ---------------- */

const VerticalSteps: React.FC<{ items: StepItem[] }> = ({ items }) => {
  return (
    <div className="rs-steps">
      {items.map((s, i) => (
        <div className="rs-step" key={s.title}>
          <div className="rs-stepRail">
            <div className={`rs-stepDot rs-stepDot--${s.state}`}>
              {s.state === "done" ? (
                <Check className="rs-stepIcon" />
              ) : s.state === "active" ? (
                <CircleDot className="rs-stepIcon" />
              ) : (
                <Circle className="rs-stepIcon" />
              )}
            </div>
            {i !== items.length - 1 && <div className="rs-stepLine" />}
          </div>

          <div className="rs-stepText">
            <div
              className={`rs-stepTitle ${s.state === "active" ? "is-active" : ""}`}
            >
              {s.title}
            </div>
            <div className="rs-stepSub">{s.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const InfoCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  onEdit?: () => void;
  children: React.ReactNode;
}> = ({ icon, title, onEdit, children }) => {
  return (
    <div className="rs-card">
      <div className="rs-cardHead">
        <div className="rs-cardHeadLeft">
          <div className="rs-cardIconWrap">{icon}</div>
          <div className="rs-cardTitle">{title}</div>
        </div>

        <button className="rs-edit" type="button" onClick={onEdit}>
          <Edit className="rs-editIcon" /> Edit
        </button>
      </div>

      <div className="rs-cardBody">{children}</div>
    </div>
  );
};

const KV: React.FC<{ label: string; value: React.ReactNode }> = ({
  label,
  value,
}) => {
  return (
    <div className="rs-kv">
      <div className="rs-kvLabel">{label}</div>
      <div className="rs-kvValue">{value}</div>
    </div>
  );
};

const Pill: React.FC<{ tone: "blue" | "green" | "gray"; text: string }> = ({
  tone,
  text,
}) => {
  return <span className={`rs-pill rs-pill--${tone}`}>{text}</span>;
};

/* ---------------- Icons (inline SVG) ---------------- */

const Edit: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 20h4l10.5-10.5a2 2 0 0 0-4-4L4 16v4Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M13.5 6.5 17.5 10.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const BoxIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6 7h12M6 12h12M6 17h7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const CalIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M7 3v2M17 3v2M4 8h16M6 5h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const SmallCal: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M7 4v2M17 4v2M5 9h14M6 6h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const Clock: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M12 7v6l4 2"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Truck: React.FC<{ className?: string }> = ({ className }) => (
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

const User: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M4.5 20a7.5 7.5 0 0 1 15 0"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const Warn: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 3 2.5 20h19L12 3Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M12 9v5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M12 17.5h.01"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
  </svg>
);

const Check: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M20 7 10.5 16.5 4 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Circle: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 20a8 8 0 1 0-8-8 8 8 0 0 0 8 8Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>
);

const CircleDot: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 20a8 8 0 1 0-8-8 8 8 0 0 0 8 8Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M12 12h.01"
      stroke="currentColor"
      strokeWidth="4.5"
      strokeLinecap="round"
    />
  </svg>
);
