// src/components/Auth/OperatorRegister.tsx
import React, { useState } from "react";
import "./Operatorregister.css";

const OperatorRegister: React.FC = () => {
  // ✅ Operator form fields
  const [name, setName] = useState("John Operator");
  const [email, setEmail] = useState("operator@company.com");
  const [phone, setPhone] = useState("+1 (555) 000-0000");
  const [password, setPassword] = useState("password");

  return (
    <div className="cr-page">
      {/* Left form panel */}
      <section className="cr-left">
        <div className="cr-leftInner">
          <div className="cr-brand">
            <div className="cr-brandIcon">
              <TruckMini className="cr-brandSvg" />
            </div>
            <div className="cr-brandText">Operator Portal</div>
          </div>

          <h1 className="cr-title">Join the Operator Portal</h1>
          <p className="cr-subtitle">
            Create your operator account to monitor yard activity and manage
            gate operations.
          </p>

          <form className="cr-form" onSubmit={(e) => e.preventDefault()}>
            <Field
              label="Full Name"
              value={name}
              placeholder="John Operator"
              onChange={setName}
            />

            <Field
              label="Email"
              value={email}
              placeholder="operator@company.com"
              onChange={setEmail}
            />

            <Field
              label="Phone Number"
              value={phone}
              placeholder="+1 (555) 000-0000"
              onChange={setPhone}
              leftIcon={<PhoneIcon className="cr-inputIcon" />}
            />

            <Field
              label="Create Password"
              value={password}
              placeholder="••••••••"
              onChange={setPassword}
              type="password"
              leftIcon={<LockIcon className="cr-inputIcon" />}
            />

            <button className="cr-btn" type="submit">
              Create Account
            </button>

            <div className="cr-bottomText">
              Already have an account?{" "}
              <a className="cr-link" href="#">
                Back to Login
              </a>
            </div>
          </form>

          <div className="cr-help">
            <span className="cr-helpDot" aria-hidden="true" />
            <span className="cr-helpText">NEED HELP? CONTACT SUPPORT</span>
          </div>
        </div>
      </section>

      {/* Right hero panel (same design) */}
      <section className="cr-right">
        <div className="cr-heroOverlay" />

        <div className="cr-rings" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="cr-hero">
          <div className="cr-pill">OPERATIONS INSIGHT</div>

          <h2 className="cr-heroTitle">
            Streamlining gate operations,
            <br />
            with real-time control.
          </h2>

          <p className="cr-heroDesc">
            Join the operator network to authorize entries faster, reduce
            congestion, and keep terminals running smoothly.
          </p>

          <div className="cr-stats">
            <div className="cr-stat">
              <div className="cr-statValue">99.9%</div>
              <div className="cr-statLabel">System Uptime</div>
            </div>
            <div className="cr-stat">
              <div className="cr-statValue">-18%</div>
              <div className="cr-statLabel">Avg. Queue Reduction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OperatorRegister;

/* ---------------- Small components ---------------- */

const Field: React.FC<{
  label: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
  type?: "text" | "password";
  leftIcon?: React.ReactNode;
}> = ({ label, value, placeholder, onChange, type = "text", leftIcon }) => {
  return (
    <label className="cr-field">
      <div className="cr-label">{label}</div>
      <div className="cr-inputWrap">
        {leftIcon ? <div className="cr-inputIconWrap">{leftIcon}</div> : null}
        <input
          className={`cr-input ${leftIcon ? "cr-input--withIcon" : ""}`}
          value={value}
          placeholder={placeholder}
          type={type}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </label>
  );
};

/* ---------------- Icons (inline SVG) ---------------- */

const TruckMini: React.FC<{ className?: string }> = ({ className }) => (
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

const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M8 3h3l1.2 5-2 1.4a14 14 0 0 0 6.4 6.4l1.4-2 5 1.2v3c0 1-1 2-2.2 2C10.5 22 2 13.5 2 4.2 2 3 3 2 4 2h3Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
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
