// src/components/Auth/CarrierRegister.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CarrierRegister: React.FC = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState("");
  const [nif, setNif] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Set authentication data
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userType", "carrier");
    localStorage.setItem("userEmail", email);
    localStorage.setItem("companyName", company);

    // Navigate to carrier dashboard
    navigate("/carrier/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#070b14] flex flex-col lg:flex-row">
      {/* Left form panel */}
      <section className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center shadow-lg">
              <TruckMini className="w-7 h-7 text-white" />
            </div>
            <div className="text-xl font-bold text-white">Carrier Portal</div>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            Join the Carrier Portal
          </h1>
          <p className="text-white/60 mb-8">
            Register your company to manage gate slots and shipments
            efficiently.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field
                label="Company Name"
                value={company}
                placeholder="Logistics Inc."
                onChange={setCompany}
                required
              />
              <Field
                label="NIF/RC Number"
                value={nif}
                placeholder="123-456-789"
                onChange={setNif}
                required
              />
            </div>

            <Field
              label="Contact Email"
              value={email}
              placeholder="admin@company.com"
              onChange={setEmail}
              type="email"
              required
            />

            <Field
              label="Phone Number"
              value={phone}
              placeholder="+1 (555) 000-0000"
              onChange={setPhone}
              leftIcon={<PhoneIcon className="w-5 h-5" />}
              required
            />

            <Field
              label="Create Password"
              value={password}
              placeholder="••••••••"
              onChange={setPassword}
              type="password"
              leftIcon={<LockIcon className="w-5 h-5" />}
              required
            />

            <button
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold hover:from-sky-600 hover:to-sky-700 transition-all duration-300 shadow-lg hover:shadow-sky-500/25"
              type="submit"
            >
              Register Company
            </button>

            <div className="text-center text-sm text-white/60">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-sky-400 hover:text-sky-300 transition-colors"
              >
                Back to Login
              </button>
            </div>
          </form>

          <div className="mt-8 flex items-center gap-2 text-xs text-white/40">
            <span
              className="w-2 h-2 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
            <span>NEED HELP? CONTACT SUPPORT</span>
          </div>
        </div>
      </section>

      {/* Right hero panel */}
      <section className="hidden lg:flex flex-1 relative bg-gradient-to-br from-sky-900/20 to-sky-950/20 items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_50%)]" />

        {/* Animated rings */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="absolute w-64 h-64 rounded-full border border-sky-500/10 animate-pulse" />
          <span
            className="absolute w-96 h-96 rounded-full border border-sky-500/5 animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <span
            className="absolute w-[32rem] h-[32rem] rounded-full border border-sky-500/5 animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="relative z-10 max-w-lg text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-semibold mb-6">
            NETWORK UPDATE
          </div>

          <h2 className="text-4xl font-black text-white mb-6 leading-tight">
            Optimizing global supply
            <br />
            chains, one slot at a time.
          </h2>

          <p className="text-lg text-white/60 mb-8">
            Join over 5,000 carriers using our automated gate management system
            to reduce wait times and improve turnaround efficiency.
          </p>

          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-1">99.9%</div>
              <div className="text-sm text-white/50">System Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-1">15min</div>
              <div className="text-sm text-white/50">Avg. Save per Gate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CarrierRegister;

/* ---------------- Small components ---------------- */

const Field: React.FC<{
  label: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
  type?: "text" | "password" | "email";
  leftIcon?: React.ReactNode;
  required?: boolean;
}> = ({
  label,
  value,
  placeholder,
  onChange,
  type = "text",
  leftIcon,
  required = false,
}) => {
  return (
    <label className="block">
      <div className="text-xs font-semibold text-white/70 mb-2 tracking-wide">
        {label}
      </div>
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
            {leftIcon}
          </div>
        )}
        <input
          className={`w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none transition-all placeholder:text-white/30 focus:border-sky-500 focus:bg-white/8 ${
            leftIcon ? "pl-11" : ""
          }`}
          value={value}
          placeholder={placeholder}
          type={type}
          onChange={(e) => onChange(e.target.value)}
          required={required}
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
