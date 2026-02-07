// src/components/Appointments/ConfirmedAppointments.tsx
import React, { useMemo, useState } from "react";

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
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] py-8 px-4">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-[#0f172a]">
              Confirmed Appointments
            </h1>
            <p className="mt-2 text-[#64748b] text-sm">
              View and manage your upcoming gate entry slots and QR credentials.
            </p>
          </div>

          <button
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-500 text-white font-semibold hover:bg-sky-600 transition-colors shadow-lg shadow-sky-500/30"
            type="button"
          >
            <span className="text-xl font-bold">＋</span> Book New Slot
          </button>
        </div>

        {/* Tabs */}
        <div className="relative mb-6">
          <div className="flex gap-6 border-b border-[#e7e9ee]">
            <button
              className={`pb-3 px-1 text-sm font-semibold transition-colors relative ${
                tab === "upcoming"
                  ? "text-sky-500"
                  : "text-[#64748b] hover:text-[#0f172a]"
              }`}
              onClick={() => setTab("upcoming")}
              type="button"
            >
              Upcoming (3)
              {tab === "upcoming" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 rounded-full" />
              )}
            </button>
            <button
              className={`pb-3 px-1 text-sm font-semibold transition-colors relative ${
                tab === "completed"
                  ? "text-sky-500"
                  : "text-[#64748b] hover:text-[#0f172a]"
              }`}
              onClick={() => setTab("completed")}
              type="button"
            >
              Completed
              {tab === "completed" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 rounded-full" />
              )}
            </button>
            <button
              className={`pb-3 px-1 text-sm font-semibold transition-colors relative ${
                tab === "canceled"
                  ? "text-sky-500"
                  : "text-[#64748b] hover:text-[#0f172a]"
              }`}
              onClick={() => setTab("canceled")}
              type="button"
            >
              Canceled
              {tab === "canceled" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500 rounded-full" />
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Left column: cards */}
          <section className="space-y-5">
            {appointments.map((a) => (
              <AppointmentCard key={a.id} appt={a} />
            ))}
          </section>

          {/* Right column: panels */}
          <aside className="space-y-5 h-fit sticky top-8">
            <div className="rounded-2xl bg-white border border-[#e7e9ee] shadow-sm p-5">
              <div className="flex items-center gap-3 mb-5">
                <BellIcon className="w-5 h-5 text-sky-500" />
                <div className="text-base font-bold text-[#0f172a]">
                  Stay Updated
                </div>
              </div>

              <div className="space-y-4 mb-5">
                <div className="text-xs font-semibold tracking-wide text-[#64748b] mb-3">
                  RDV Confirmation
                </div>

                <ToggleRow
                  icon={<ChatIcon className="w-4 h-4" />}
                  label="SMS Alerts"
                  checked={smsAlerts}
                  onChange={setSmsAlerts}
                />
                <ToggleRow
                  icon={<ChatIcon className="w-4 h-4" />}
                  label="WhatsApp Notification"
                  checked={whatsappAlerts}
                  onChange={setWhatsappAlerts}
                />
              </div>

              <div className="h-px bg-[#e7e9ee] my-4" />

              <div className="space-y-4 mb-5">
                <div className="text-xs font-semibold tracking-wide text-[#64748b] mb-3">
                  RDV Cancellations
                </div>

                <ToggleRow
                  icon={<MailIcon className="w-4 h-4" />}
                  label="Email Alerts"
                  checked={emailAlerts}
                  onChange={setEmailAlerts}
                />
              </div>

              <button
                className="w-full px-4 py-2.5 rounded-xl bg-sky-500 text-white font-semibold hover:bg-sky-600 transition-colors"
                type="button"
              >
                Update Preferences
              </button>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 shadow-sm p-5 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <InfoIcon className="w-5 h-5 text-amber-600" />
                <div className="text-base font-bold text-amber-900">
                  Gate Entry Policy
                </div>
              </div>

              <ul className="space-y-2 mb-4 text-sm text-amber-900/80">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Arrive at least 10 mins before your slot.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>QR code must be ready for scanning.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>Valid ID required for all drivers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">•</span>
                  <span>No trailer unhooking in Zone B.</span>
                </li>
              </ul>

              <button
                className="w-full px-4 py-2.5 rounded-xl border-2 border-amber-300 bg-white/80 text-amber-900 font-semibold hover:bg-white transition-colors"
                type="button"
              >
                View Manual
              </button>

              <div className="absolute bottom-3 right-3 w-12 h-12 rounded-full bg-amber-200/50 flex items-center justify-center text-amber-600 font-black text-xl">
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
    <div className="rounded-2xl bg-white border border-[#e7e9ee] shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-0">
        <div className="p-6">
          <div
            className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
              badgeTone === "green"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-sky-100 text-sky-700"
            }`}
          >
            {appt.status}
          </div>

          <div className="mt-4 text-xl font-bold text-sky-500">{appt.id}</div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <div className="text-xs font-semibold tracking-wide text-[#64748b]">
                TIME WINDOW
              </div>
              <div className="mt-1 text-base font-bold text-[#0f172a]">
                {appt.timeWindow}{" "}
                <span className="text-sm font-normal text-[#64748b]">
                  ({appt.durationMins} mins)
                </span>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold tracking-wide text-[#64748b]">
                DRIVER
              </div>
              <div className="mt-1 text-base font-bold text-[#0f172a]">
                {appt.driver}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {appt.status === "CONFIRMED" ? (
              <>
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#e7e9ee] bg-white text-[#0f172a] font-semibold hover:bg-gray-50 transition-colors"
                  type="button"
                >
                  <PrintIcon className="w-4 h-4" />
                  Print Pass
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#e7e9ee] bg-white text-[#0f172a] font-semibold hover:bg-gray-50 transition-colors"
                  type="button"
                >
                  <DownloadIcon className="w-4 h-4" />
                  PDF
                </button>
                <button
                  className="w-9 h-9 rounded-lg border border-red-200 bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors"
                  type="button"
                  title="Cancel"
                >
                  ✕
                </button>
              </>
            ) : (
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-500 text-white font-semibold hover:bg-sky-600 transition-colors"
                type="button"
              >
                Pass Details
                <LockIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-l border-[#e7e9ee] flex flex-col items-center justify-center">
          <div className="text-sm font-bold text-[#0f172a] mb-2">
            {appt.date}
          </div>
          <div className="text-xs font-semibold text-sky-600 mb-4">
            {appt.gate}
          </div>

          <div
            className={`relative w-32 h-32 rounded-xl overflow-hidden ${
              appt.qrState === "pending" ? "blur-sm" : ""
            }`}
          >
            <div className="w-full h-full bg-white border-4 border-[#0f172a] p-2">
              <div className="w-full h-full bg-[radial-gradient(circle,#0f172a_25%,transparent_25%),radial-gradient(circle,#0f172a_25%,transparent_25%)] bg-[length:8px_8px] bg-[position:0_0,4px_4px]" />
            </div>
          </div>

          {appt.qrState === "ready" ? (
            <div className="mt-3 text-xs font-bold text-[#0f172a] tracking-wider">
              SCAN AT {appt.gate.toUpperCase()}
            </div>
          ) : (
            <div className="mt-3 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
              PENDING VERIFICATION
            </div>
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
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
          {icon}
        </div>
        <div className="text-sm font-medium text-[#0f172a]">{label}</div>
      </div>

      <button
        className={`relative w-12 h-6 rounded-full transition-colors ${
          checked ? "bg-sky-500" : "bg-gray-300"
        }`}
        type="button"
        onClick={() => onChange(!checked)}
        aria-pressed={checked}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "left-[26px]" : "left-0.5"
          }`}
        />
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
