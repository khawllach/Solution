import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"carrier" | "operator">("carrier");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate login - store user type
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userType", userType);
    localStorage.setItem("userEmail", email);

    // Navigate to appropriate dashboard
    if (userType === "carrier") {
      navigate("/carrier/dashboard");
    } else {
      navigate("/operator/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070b14] via-[#0b141f] to-[#070b14] flex items-center justify-center px-6 py-12">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-orange-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-sky-600 mb-4 shadow-lg shadow-sky-500/30">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-white mb-2">Welcome Back</h1>
          <p className="text-white/60">
            Sign in to access your logistics portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* User Type Selector */}
            <div>
              <label className="text-sm font-semibold text-white/80 mb-3 block">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserType("carrier")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    userType === "carrier"
                      ? "border-sky-500 bg-sky-500/10 text-white"
                      : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                  }`}
                >
                  <div className="text-2xl mb-2">🚛</div>
                  <div className="text-sm font-semibold">Carrier</div>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("operator")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    userType === "operator"
                      ? "border-sky-500 bg-sky-500/10 text-white"
                      : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                  }`}
                >
                  <div className="text-2xl mb-2">⚙️</div>
                  <div className="text-sm font-semibold">Operator</div>
                </button>
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="text-sm font-semibold text-white/80 mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="text-sm font-semibold text-white/80 mb-2 block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-white/5 border border-white/10 text-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />
                <span className="text-sm text-white/60">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-sky-400 hover:text-sky-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold hover:from-sky-600 hover:to-sky-700 transition-all shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 hover:-translate-y-0.5"
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#0b141f] text-white/40">
                  New to the platform?
                </span>
              </div>
            </div>

            {/* Register Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => navigate("/carrier-register")}
                className="py-2.5 px-4 rounded-xl border border-white/10 bg-white/5 text-white/80 font-semibold hover:bg-white/10 transition-all text-sm"
              >
                Register as Carrier
              </button>
              <button
                type="button"
                onClick={() => navigate("/operator-register")}
                className="py-2.5 px-4 rounded-xl border border-white/10 bg-white/5 text-white/80 font-semibold hover:bg-white/10 transition-all text-sm"
              >
                Register as Operator
              </button>
            </div>
          </form>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center text-sm text-white/40">
          <a href="#" className="hover:text-white/60 transition-colors">
            Help Center
          </a>
          <span className="mx-3">•</span>
          <a href="#" className="hover:text-white/60 transition-colors">
            Privacy Policy
          </a>
          <span className="mx-3">•</span>
          <a href="#" className="hover:text-white/60 transition-colors">
            Terms of Service
          </a>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <div className="text-xs font-semibold text-emerald-300 mb-2">
            🎯 Demo Credentials
          </div>
          <div className="text-xs text-emerald-200/80 space-y-1">
            <div>Email: demo@carrier.com or demo@operator.com</div>
            <div>Password: Any password works (demo mode)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
