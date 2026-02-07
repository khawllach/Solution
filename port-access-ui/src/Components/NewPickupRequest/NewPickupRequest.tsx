// src/components/Pickups/NewPickupRequest.tsx
import React, { useMemo, useState } from "react";

import VerticalSteps, { type StepItem, type StepState } from "./VerticalSteps";

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
    <div className="min-h-screen bg-[#f6f7f9] text-[#0f172a]">
      <main className="max-w-[1120px] mx-auto py-7 px-6">
        <div className="text-xs text-[#64748b]">
          Pickups &nbsp;/&nbsp; New Request
        </div>

        <div className="mt-2.5">
          <h1 className="my-2.5 text-[28px] font-extrabold text-[#0f172a]">
            New Pickup Request
          </h1>
          <p className="m-0 text-[#64748b] text-[13px]">
            Enter the container details and driver info to book your slot.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-5">
          {/* Left: steps + form */}
          <section className="flex flex-col gap-6">
            {/* Steps */}
            <div className="rounded-2xl bg-white border border-[#e7e9ee] p-6 shadow-sm">
              <VerticalSteps steps={steps} />
            </div>

            {/* Form Card */}
            <div className="rounded-2xl bg-white border border-[#e7e9ee] shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 p-5 border-b border-[#e7e9ee]">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center" />
                <div className="text-base font-bold text-[#0f172a]">
                  Cargo Information
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-semibold text-[#0f172a] mb-2">
                      Container Type
                    </div>
                    <div className="flex gap-2">
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
                    <div className="text-sm font-semibold text-[#0f172a] mb-2">
                      Status
                    </div>
                    <div className="flex gap-2">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                <div className="flex gap-3 p-4 rounded-xl bg-sky-50 border border-sky-200">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sky-500 text-white text-xs font-bold flex-shrink-0">
                    i
                  </span>
                  <div className="text-sm text-[#0f172a]/70">
                    Ensure the Container Number matches the manifest.
                    Discrepancies may lead to slot cancellation at the gate.
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <button className="w-full sm:w-auto px-5 py-2.5 rounded-xl border-2 border-[#e7e9ee] bg-white text-[#0f172a] font-semibold hover:bg-gray-50 transition-colors">
                Cancel Request
              </button>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <button className="w-full sm:w-auto px-5 py-2.5 text-[#64748b] font-semibold hover:text-[#0f172a] transition-colors">
                  Save as Draft
                </button>

                <button
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-500 text-white font-semibold hover:bg-sky-600 transition-colors flex items-center justify-center gap-2"
                  onClick={() => {
                    // basic step flow
                    if (step === "container") setStep("driver");
                    else if (step === "driver") setStep("review");
                  }}
                >
                  Continue to Driver Details
                  <span>→</span>
                </button>
              </div>
            </div>
          </section>

          {/* Right: summary */}
          <aside className="h-fit">
            <div className="rounded-2xl bg-white border border-[#e7e9ee] shadow-sm p-5 space-y-4 sticky top-20">
              <div className="text-xs font-bold tracking-wider text-[#64748b]">
                LIVE SUMMARY
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-semibold tracking-wide text-[#64748b]">
                  CONTAINER
                </div>
                <div className="text-base font-bold text-[#0f172a]">
                  {summary.container}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-semibold tracking-wide text-[#64748b]">
                  GATE TERMINAL
                </div>
                <div className="text-base font-bold text-[#0f172a]">
                  {summary.terminal}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-semibold tracking-wide text-[#64748b]">
                  EST. PROCESSING TIME
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-base font-bold text-[#0f172a]">
                    {summary.etaMinutes} Minutes
                  </span>
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
    <label className="block">
      <div className="text-sm font-semibold text-[#0f172a] mb-2">{label}</div>
      <input
        className="w-full px-4 py-2.5 rounded-xl border border-[#e7e9ee] bg-white text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
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
    <label className="block">
      <div className="text-sm font-semibold text-[#0f172a] mb-2">{label}</div>
      <div className="relative">
        <input
          className="w-full px-4 py-2.5 rounded-xl border border-[#e7e9ee] bg-white text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
          value={value}
          placeholder="mm/dd/yyyy"
          onChange={(e) => onChange(e.target.value)}
          type="date"
        />
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
    <label className="block">
      <div className="text-sm font-semibold text-[#0f172a] mb-2">{label}</div>
      <select
        className="w-full px-4 py-2.5 rounded-xl border border-[#e7e9ee] bg-white text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all cursor-pointer"
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
      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
        active
          ? "bg-sky-500 text-white ring-2 ring-sky-500/30"
          : "bg-white border border-[#e7e9ee] text-[#64748b] hover:border-sky-300 hover:text-sky-600"
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
