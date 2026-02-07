// src/components/Steps/VerticalSteps.tsx
import React from "react";

export type StepState = "active" | "idle" | "done";

export type StepItem = {
  title: string;
  subtitle: string;
  state: StepState;
};

type Props = {
  steps: StepItem[];
};

const VerticalSteps: React.FC<Props> = ({ steps }) => {
  return (
    <div className="flex flex-col gap-0">
      {steps.map((s, idx) => (
        <div className="flex gap-4" key={s.title}>
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                s.state === "done"
                  ? "bg-emerald-500/20 text-emerald-400 ring-2 ring-emerald-500/30"
                  : s.state === "active"
                    ? "bg-sky-500/20 text-sky-400 ring-2 ring-sky-500/30"
                    : "bg-white/5 text-white/30 ring-1 ring-white/10"
              }`}
            >
              {s.state === "done" ? (
                <CheckIcon className="w-5 h-5" />
              ) : s.state === "idle" ? (
                <UserIcon className="w-5 h-5" />
              ) : (
                <BoxIcon className="w-5 h-5" />
              )}
            </div>

            {idx !== steps.length - 1 && (
              <div
                className={`w-0.5 flex-1 mt-2 transition-all ${
                  s.state === "active"
                    ? "bg-gradient-to-b from-sky-500/50 to-white/10"
                    : "bg-white/10"
                }`}
                style={{ minHeight: "40px" }}
              />
            )}
          </div>

          <div className="flex-1 pb-8">
            <div
              className={`text-base font-semibold transition-colors ${
                s.state === "active" ? "text-white" : "text-white/60"
              }`}
            >
              {s.title}
            </div>
            <div className="text-sm text-white/40 mt-1">{s.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerticalSteps;

/* -------- Inline SVG icons -------- */

const BoxIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M7 8h10M7 12h10M7 16h6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
      stroke="currentColor"
      strokeWidth="1.8"
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
