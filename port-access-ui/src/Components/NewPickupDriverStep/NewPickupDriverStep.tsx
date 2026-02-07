import React, { useMemo, useState } from "react";
import "./NewPickupDriverStep.css";
import Topbar from "../Layouts/Topbar";

type StepState = "done" | "active" | "idle";

type StepItem = {
  title: string;
  subtitle: string;
  state: StepState;
};

type Summary = {
  container: string;
  containerMeta: string;
  reference: string;
  slotDate: string;
  slotTime: string;
  terminal: string;
  etaMinutes: number;
};

const NewPickupDriverStep: React.FC = () => {
  // Driver form
  const [driverName, setDriverName] = useState("");
  const [driverId, setDriverId] = useState("");
  const [countryCode, setCountryCode] = useState("+1 (US)");
  const [phone, setPhone] = useState("");
  const [truck, setTruck] = useState("");

  const steps: StepItem[] = [
    {
      title: "Cargo Information",
      subtitle: "Container details confirmed",
      state: "done",
    },
    {
      title: "Driver Information",
      subtitle: "Assign driver and vehicle",
      state: "active",
    },
    {
      title: "Review & Submit",
      subtitle: "Confirm gate slot booking",
      state: "idle",
    },
  ];

  const summary: Summary = useMemo(
    () => ({
      container: "ABCD1234567",
      containerMeta: "40ft / Full (Laden)",
      reference: "REF-0098231",
      slotDate: "Oct 24, 2023",
      slotTime: "08:00 - 10:00",
      terminal: "Main Port Terminal 3",
      etaMinutes: 25,
    }),
    [],
  );

  return (
    <div className="ds2-page">
      {/* Topbar */}
      <Topbar />

      <main className="ds2-main">
        <div className="ds2-breadcrumb">Pickups &nbsp;/&nbsp; New Request</div>

        <div className="ds2-header">
          <h1 className="ds2-title">New Pickup Request</h1>
          <p className="ds2-subtitle">
            Step 2: Assign driver and vehicle information.
          </p>
        </div>

        <div className="ds2-layout">
          {/* Left: steps + card */}
          <section className="ds2-left">
            <VerticalSteps items={steps} />

            <div className="ds2-card">
              <div className="ds2-cardTitleRow">
                <PinIcon className="ds2-cardIcon" />
                <div className="ds2-cardTitle">Driver Details</div>
              </div>

              <div className="ds2-form">
                <div className="ds2-grid2">
                  <Field
                    label="Driver Name"
                    placeholder="e.g. John Doe"
                    value={driverName}
                    onChange={setDriverName}
                  />
                  <Field
                    label="CIN/ID Number"
                    placeholder="A12345678"
                    value={driverId}
                    onChange={setDriverId}
                  />
                </div>

                <div className="ds2-phoneRow">
                  <div className="ds2-phoneLeft">
                    <div className="ds2-label">Phone Number</div>
                    <div className="ds2-phoneInputs">
                      <select
                        className="ds2-select ds2-select--cc"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                      >
                        <option>+1 (US)</option>
                        <option>+33 (FR)</option>
                        <option>+49 (DE)</option>
                        <option>+213 (DZ)</option>
                        <option>+216 (TN)</option>
                        <option>+212 (MA)</option>
                      </select>

                      <input
                        className="ds2-input"
                        placeholder="555-0123"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="ds2-divider" />

                <div className="ds2-cardTitleRow ds2-cardTitleRow--spaced">
                  <TruckIcon className="ds2-cardIcon" />
                  <div className="ds2-cardTitle">Vehicle Selection</div>
                </div>

                <div className="ds2-vehicleRow">
                  <div className="ds2-fieldGrow">
                    <div className="ds2-label">
                      Registered Trucks (Plate Number)
                    </div>
                    <select
                      className="ds2-select"
                      value={truck}
                      onChange={(e) => setTruck(e.target.value)}
                    >
                      <option value="">Select a truck...</option>
                      <option value="TRK-102-AA">TRK-102-AA</option>
                      <option value="TRK-551-BB">TRK-551-BB</option>
                      <option value="TRK-778-CC">TRK-778-CC</option>
                    </select>
                  </div>

                  <button className="ds2-btn ds2-btn--outline" type="button">
                    <span className="ds2-plus">＋</span> Add New
                  </button>
                </div>

                <div className="ds2-info">
                  <span className="ds2-infoDot">i</span>
                  <div className="ds2-infoText">
                    The driver must present the registered ID and the pickup
                    reference upon arrival at the gate.
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="ds2-actions">
              <button className="ds2-btn ds2-btn--ghost" type="button">
                Back to Cargo Info
              </button>

              <button className="ds2-btn ds2-btn--text" type="button">
                Save as Draft
              </button>

              <button className="ds2-btn ds2-btn--primary" type="button">
                Continue to Review <span className="ds2-arrow">→</span>
              </button>
            </div>
          </section>

          {/* Right: summary */}
          <aside className="ds2-right">
            <SummaryCard summary={summary} />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default NewPickupDriverStep;

/* ---------------- Components ---------------- */

const Field: React.FC<{
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}> = ({ label, placeholder, value, onChange }) => (
  <label className="ds2-field">
    <div className="ds2-label">{label}</div>
    <input
      className="ds2-input"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </label>
);

const VerticalSteps: React.FC<{ items: StepItem[] }> = ({ items }) => {
  return (
    <div className="ds2-steps">
      {items.map((s, i) => (
        <div className="ds2-step" key={s.title}>
          <div className="ds2-stepRail">
            <div className={`ds2-stepDot ds2-stepDot--${s.state}`}>
              {s.state === "done" ? (
                <CheckIcon className="ds2-stepIcon" />
              ) : s.state === "active" ? (
                <UserIcon className="ds2-stepIcon" />
              ) : (
                <CircleIcon className="ds2-stepIcon" />
              )}
            </div>
            {i !== items.length - 1 && <div className="ds2-stepLine" />}
          </div>

          <div className="ds2-stepText">
            <div
              className={`ds2-stepTitle ${s.state === "active" ? "is-active" : ""}`}
            >
              {s.title}
            </div>
            <div className="ds2-stepSub">{s.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const SummaryCard: React.FC<{ summary: Summary }> = ({ summary }) => {
  return (
    <div className="ds2-summary">
      <div className="ds2-summaryTitle">LIVE SUMMARY</div>

      <div className="ds2-sBlock">
        <div className="ds2-sLabel">CONTAINER</div>
        <div className="ds2-sValue">{summary.container}</div>
        <div className="ds2-sMeta">{summary.containerMeta}</div>
      </div>

      <div className="ds2-sBlock">
        <div className="ds2-sLabel">REFERENCE</div>
        <div className="ds2-sValue">{summary.reference}</div>
      </div>

      <div className="ds2-sBlock">
        <div className="ds2-sLabel">SCHEDULED SLOT</div>
        <div className="ds2-sValue">{summary.slotDate}</div>
        <div className="ds2-sMeta">{summary.slotTime}</div>
      </div>

      <div className="ds2-summaryDivider" />

      <div className="ds2-sBlock">
        <div className="ds2-sLabel">GATE TERMINAL</div>
        <div className="ds2-sValue">{summary.terminal}</div>
      </div>

      <div className="ds2-sBlock">
        <div className="ds2-sLabel">EST. PROCESSING</div>
        <div className="ds2-eta">
          <span className="ds2-etaDot" />
          <span>{summary.etaMinutes} Minutes</span>
        </div>
      </div>
    </div>
  );
};

/* ---------------- Icons (inline SVG) ---------------- */

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
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

const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
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

const CircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 20a8 8 0 1 0-8-8 8 8 0 0 0 8 8Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>
);

const PinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
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
