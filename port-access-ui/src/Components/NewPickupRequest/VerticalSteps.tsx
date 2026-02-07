// src/components/Steps/VerticalSteps.tsx
import React from "react";
import "./VerticalSteps.css";

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
    <div className="vs">
      {steps.map((s, idx) => (
        <div className="vs__row" key={s.title}>
          <div className="vs__rail">
            <div className={`vs__dot vs__dot--${s.state}`}>
              {s.state === "done" ? (
                <CheckIcon className="vs__icon" />
              ) : s.state === "idle" ? (
                <UserIcon className="vs__icon" />
              ) : (
                <BoxIcon className="vs__icon" />
              )}
            </div>

            {idx !== steps.length - 1 && (
              <div
                className={`vs__line ${
                  s.state === "active" ? "vs__line--active" : ""
                }`}
              />
            )}
          </div>

          <div className="vs__text">
            <div
              className={`vs__title ${s.state === "active" ? "is-active" : ""}`}
            >
              {s.title}
            </div>
            <div className="vs__subtitle">{s.subtitle}</div>
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
