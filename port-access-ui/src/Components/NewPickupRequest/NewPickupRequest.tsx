// src/components/Pickups/NewPickupRequest.tsx
import React, { useMemo, useState } from "react";
import "./NewPickupRequest.css";

import VerticalSteps, { type StepItem, type StepState } from "./VerticalSteps";
import Topbar from "../Layouts/Topbar";

type StepKey = "container" | "driver" | "review";

type ContainerType = "20ft" | "40ft" | "Other";
type LoadStatus = "Empty" | "Full (Laden)";

type LiveSummary = {
  container: string;
  terminal: string;
  etaMinutes: number;
};

const NewPickupRequest: React.FC = () => {
  const [step, setStep] = useState<StepKey>("container");

  const [containerNumber, setContainerNumber] = useState("ABCD1234567");
  const [referenceNumber, setReferenceNumber] = useState("REF-0098231");
  const [containerType, setContainerType] = useState<ContainerType>("20ft");
  const [loadStatus, setLoadStatus] = useState<LoadStatus>("Full (Laden)");
  const [preferredDate, setPreferredDate] = useState("");
  const [timeWindow, setTimeWindow] = useState("08:00 - 10:00 (Early Morning)");

  const summary: LiveSummary = useMemo(
    () => ({
      container: containerNumber.trim() ? containerNumber : "Not entered yet",
      terminal: "Main Port Terminal 3",
      etaMinutes: 25,
    }),
    [containerNumber],
  );

  const stepIndex = (k: StepKey) =>
    k === "container" ? 0 : k === "driver" ? 1 : 2;

  const currentIdx = stepIndex(step);

  const steps: StepItem[] = [
    {
      title: "Container Details",
      subtitle: "Enter ISO number and load type",
      state: (currentIdx === 0
        ? "active"
        : currentIdx > 0
          ? "done"
          : "idle") as StepState,
    },
    {
      title: "Driver Information",
      subtitle: "Assign driver and vehicle",
      state: (currentIdx === 1
        ? "active"
        : currentIdx > 1
          ? "done"
          : "idle") as StepState,
    },
    {
      title: "Review & Submit",
      subtitle: "Confirm gate slot booking",
      state: (currentIdx === 2 ? "active" : "idle") as StepState,
    },
  ];

  return (
    <div className="npr-page">
      {/* Top bar */}
      <Topbar />
      <main className="npr-main">
        <div className="npr-breadcrumb">Pickups &nbsp;/&nbsp; New Request</div>

        <div className="npr-header">
          <h1 className="npr-title">New Pickup Request</h1>
          <p className="npr-subtitle">
            Enter the container details and driver info to book your slot.
          </p>
        </div>

        <div className="npr-content">
          {/* Left: steps + form */}
          <section className="npr-left">
            {/* ✅ Steps (replaced StepItem with VerticalSteps) */}
            <div
              onClick={(_e) => {
                // Optional: click step row area to change step.
                // We'll map by Y position is not reliable; better: wrap each row with buttons
                // If you want clickable steps, tell me and I'll add an onStepClick prop in VerticalSteps.
              }}
            >
              <VerticalSteps steps={steps} />
            </div>

            {/* Form Card */}
            <div className="npr-card">
              <div className="npr-card__header">
                <div className="npr-card__icon" />
                <div>
                  <div className="npr-card__title">Cargo Information</div>
                </div>
              </div>

              <div className="npr-form">
                <div className="npr-grid-2">
                  <Field
                    label="Container Number"
                    value={containerNumber}
                    placeholder="ABCD1234567"
                    onChange={setContainerNumber}
                  />
                  <Field
                    label="Reference Number (BL/DO)"
                    value={referenceNumber}
                    placeholder="REF-0098231"
                    onChange={setReferenceNumber}
                  />
                </div>

                <div className="npr-grid-2">
                  <div>
                    <div className="npr-label">Container Type</div>
                    <div className="npr-pillrow">
                      <Pill
                        text="20ft"
                        active={containerType === "20ft"}
                        onClick={() => setContainerType("20ft")}
                      />
                      <Pill
                        text="40ft"
                        active={containerType === "40ft"}
                        onClick={() => setContainerType("40ft")}
                      />
                      <Pill
                        text="Other"
                        active={containerType === "Other"}
                        onClick={() => setContainerType("Other")}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="npr-label">Status</div>
                    <div className="npr-pillrow">
                      <Pill
                        text="Empty"
                        active={loadStatus === "Empty"}
                        onClick={() => setLoadStatus("Empty")}
                      />
                      <Pill
                        text="Full (Laden)"
                        active={loadStatus === "Full (Laden)"}
                        onClick={() => setLoadStatus("Full (Laden)")}
                      />
                    </div>
                  </div>
                </div>

                <div className="npr-grid-2">
                  <DateField
                    label="Preferred Date"
                    value={preferredDate}
                    onChange={setPreferredDate}
                  />
                  <SelectField
                    label="Preferred Time Window"
                    value={timeWindow}
                    onChange={setTimeWindow}
                    options={[
                      "08:00 - 10:00 (Early Morning)",
                      "10:00 - 12:00 (Late Morning)",
                      "12:00 - 14:00 (Early Afternoon)",
                      "14:00 - 16:00 (Late Afternoon)",
                    ]}
                  />
                </div>

                <div className="npr-info">
                  <span className="npr-info__dot">i</span>
                  <div className="npr-info__text">
                    Ensure the Container Number matches the manifest.
                    Discrepancies may lead to slot cancellation at the gate.
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="npr-actions">
              <button className="npr-btn npr-btn--ghost">Cancel Request</button>

              <div className="npr-actions__right">
                <button className="npr-btn npr-btn--text">Save as Draft</button>

                <button
                  className="npr-btn npr-btn--primary"
                  onClick={() => {
                    // basic step flow
                    if (step === "container") setStep("driver");
                    else if (step === "driver") setStep("review");
                  }}
                >
                  Continue to Driver Details{" "}
                  <span className="npr-arrow">→</span>
                </button>
              </div>
            </div>
          </section>

          {/* Right: summary */}
          <aside className="npr-right">
            <div className="npr-summary">
              <div className="npr-summary__title">LIVE SUMMARY</div>

              <div className="npr-summary__block">
                <div className="npr-summary__label">CONTAINER</div>
                <div className="npr-summary__value">{summary.container}</div>
              </div>

              <div className="npr-summary__block">
                <div className="npr-summary__label">GATE TERMINAL</div>
                <div className="npr-summary__value">{summary.terminal}</div>
              </div>

              <div className="npr-summary__block">
                <div className="npr-summary__label">EST. PROCESSING TIME</div>
                <div className="npr-summary__eta">
                  <span className="npr-summary__eta-dot" />
                  <span>{summary.etaMinutes} Minutes</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default NewPickupRequest;

/* ---------------- Small components ---------------- */

const Field: React.FC<{
  label: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
}> = ({ label, value, placeholder, onChange }) => {
  return (
    <label className="npr-field">
      <div className="npr-label">{label}</div>
      <input
        className="npr-input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
};

const DateField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
}> = ({ label, value, onChange }) => {
  return (
    <label className="npr-field">
      <div className="npr-label">{label}</div>
      <div className="npr-datewrap">
        <input
          className="npr-input npr-input--date"
          value={value}
          placeholder="mm/dd/yyyy"
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="npr-dateicon" aria-hidden="true" />
      </div>
    </label>
  );
};

const SelectField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}> = ({ label, value, onChange, options }) => {
  return (
    <label className="npr-field">
      <div className="npr-label">{label}</div>
      <select
        className="npr-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
};

const Pill: React.FC<{
  text: string;
  active?: boolean;
  onClick?: () => void;
}> = ({ text, active, onClick }) => {
  return (
    <button
      type="button"
      className={`npr-pill ${active ? "npr-pill--active" : ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
