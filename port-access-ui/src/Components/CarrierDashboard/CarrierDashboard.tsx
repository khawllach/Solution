// src/components/Dashboard/CarrierDashboard.tsx
// ✅ No external icon libraries (NO lucide-react). Pure inline SVG icons.
// ✅ React + TypeScript + Tailwind
// Usage in App.tsx:  <CarrierDashboard />

import React from "react";
import { useNavigate } from "react-router-dom";
import Ai from "../Ai/Ai";
import Trackmap from "../Trackmap/LiveTracking";

type Stat = {
  label: string;
  value: string | number;
  accent: "blue" | "orange" | "gray";
};

type AppointmentStatus = "CONFIRMED" | "PENDING DOCUMENTATION";

type Appointment = {
  time: string;
  plate: string;
  gate: string;
  status: AppointmentStatus;
  footerLeft: string;
  footerAction: string;
  footerActionTone: "blue" | "orange";
  iconTone: "blue" | "orange";
};

type HistoryStatus = "Completed" | "Missed Slot" | "Rejected (Doc)";

type HistoryRow = {
  date: string;
  timeRange: string;
  rdv: string;
  vehicle: string;
  trailer: string;
  status: HistoryStatus;
};

const cx = (...c: Array<string | false | null | undefined>) =>
  c.filter(Boolean).join(" ");

/* ---------- Inline Icons (SVG) ---------- */

const Icon = {
  Calendar: ({ className }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 3v2M17 3v2M4 8h16M6 5h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),

  Clock: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
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
  ),

  Folder: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M3.5 7.5a2 2 0 0 1 2-2H10l2 2h6.5a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2V7.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 13.5h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M16.5 11.5v4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),

  Warning: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
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
  ),

  Dot: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 12h.01"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  ),

  Pin: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
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
  ),

  Eye: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  ),

  Refresh: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M20 12a8 8 0 1 1-2.35-5.65"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M20 4v6h-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  Info: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
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
  ),

  Filter: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M4 6h16M7 12h10M10 18h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),

  Export: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3v10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8.5 6.5 12 3l3.5 3.5"
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
  ),

  ChevronLeft: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M15 18 9 12l6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  ChevronRight: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  Check: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M20 7 10.5 16.5 4 10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

/* ---------- Small UI helpers ---------- */

const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => (
  <div
    className={cx(
      "rounded-2xl bg-white/[0.04] ring-1 ring-white/10 shadow-[0_22px_70px_-38px_rgba(0,0,0,0.85)]",
      className,
    )}
  >
    {children}
  </div>
);

const StatChip: React.FC<{ stat: Stat }> = ({ stat }) => {
  const leftBar =
    stat.accent === "blue"
      ? "bg-sky-500"
      : stat.accent === "orange"
        ? "bg-orange-500"
        : "bg-white/20";

  const valueTone =
    stat.accent === "blue"
      ? "text-sky-300"
      : stat.accent === "orange"
        ? "text-orange-300"
        : "text-white/85";

  return (
    <div className="min-w-[150px] rounded-xl bg-white/[0.03] ring-1 ring-white/10 overflow-hidden">
      <div className="flex h-full">
        <div className={cx("w-[3px]", leftBar)} />
        <div className="px-4 py-3">
          <div className="text-[11px] font-semibold tracking-wide text-white/45">
            {stat.label.toUpperCase()}
          </div>
          <div className={cx("mt-1 text-xl font-semibold", valueTone)}>
            {stat.value}
          </div>
        </div>
      </div>
    </div>
  );
};

const Badge: React.FC<{
  text: string;
  tone: "blue" | "orange" | "green" | "red" | "gray";
}> = ({ text, tone }) => {
  const styles =
    tone === "blue"
      ? "bg-sky-500/15 text-sky-300 ring-sky-500/25"
      : tone === "orange"
        ? "bg-orange-500/15 text-orange-300 ring-orange-500/25"
        : tone === "green"
          ? "bg-emerald-500/15 text-emerald-300 ring-emerald-500/25"
          : tone === "red"
            ? "bg-rose-500/15 text-rose-300 ring-rose-500/25"
            : "bg-white/10 text-white/55 ring-white/15";

  return (
    <span
      className={cx(
        "inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ring-1",
        styles,
      )}
    >
      {text}
    </span>
  );
};

const Divider = () => <div className="h-px w-full bg-white/10" />;

/* ---------- Appointment Card ---------- */

const AppointmentCard: React.FC<{ appt: Appointment }> = ({ appt }) => {
  const navigate = useNavigate();

  const iconWrap =
    appt.iconTone === "blue"
      ? "bg-sky-500/15 text-sky-300 ring-sky-500/25"
      : "bg-orange-500/15 text-orange-300 ring-orange-500/25";

  const statusBadge =
    appt.status === "CONFIRMED" ? (
      <Badge text="CONFIRMED" tone="blue" />
    ) : (
      <Badge text="PENDING DOCUMENTATION" tone="orange" />
    );

  const actionTone =
    appt.footerActionTone === "blue"
      ? "text-sky-300 hover:text-sky-200"
      : "text-orange-300 hover:text-orange-200";

  const handleAction = () => {
    if (appt.footerAction === "Fix Now") {
      navigate("/carrier/control");
    } else {
      alert(`Viewing details for ${appt.plate}`);
    }
  };

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className={cx(
              "flex h-12 w-12 items-center justify-center rounded-2xl ring-1",
              iconWrap,
            )}
          >
            {appt.iconTone === "blue" ? (
              <Icon.Clock className="h-6 w-6" />
            ) : (
              <Icon.Folder className="h-6 w-6" />
            )}
          </div>

          <div className="min-w-0">
            <div className="text-lg font-semibold text-white/90">
              {appt.time}
            </div>
            <div className="mt-1 text-sm text-white/55">
              Plate: <span className="text-white/75">{appt.plate}</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm text-white/45">
              <Icon.Pin className="h-4 w-4" />
              <span>{appt.gate}</span>
            </div>
          </div>
        </div>

        <div className="shrink-0">{statusBadge}</div>
      </div>

      <div className="mt-5" />
      <Divider />
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="text-sm text-white/45">{appt.footerLeft}</div>
        <button
          className={cx("text-sm font-semibold transition", actionTone)}
          onClick={handleAction}
        >
          {appt.footerAction} <span className="ml-1">→</span>
        </button>
      </div>
    </Card>
  );
};

/* ---------- Rules Card ---------- */

const GateEntryRules: React.FC = () => {
  return (
    <Card className="p-5 ring-orange-500/15">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500/15 ring-1 ring-orange-500/25 text-orange-300">
          <Icon.Warning className="h-5 w-5" />
        </div>
        <div className="text-lg font-semibold text-white/90">
          Gate Entry Rules
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-orange-500/8 ring-1 ring-orange-500/20 p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-orange-300">
            <Icon.Warning className="h-5 w-5" />
          </div>
          <div>
            <div className="font-semibold text-orange-300">
              Time Window Constraint
            </div>
            <div className="mt-1 text-sm text-orange-200/80">
              Drivers must arrive within{" "}
              <span className="font-semibold">+/- 5 minutes</span> of their
              scheduled slot.
            </div>
          </div>
        </div>

        <div className="mt-4 h-px bg-orange-500/15" />

        <ul className="mt-4 space-y-3 text-sm text-white/60">
          <li className="flex items-center gap-3">
            <Icon.Dot className="h-4 w-4 text-white/35" />
            No waiting permitted on site road.
          </li>
          <li className="flex items-center gap-3">
            <Icon.Dot className="h-4 w-4 text-white/35" />
            Hi-vis and safety boots mandatory.
          </li>
          <li className="flex items-center gap-3">
            <Icon.Dot className="h-4 w-4 text-white/35" />
            Valid ID and RDV ID required for entry.
          </li>
        </ul>

        <button
          className="mt-5 w-full rounded-xl bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white/80 ring-1 ring-white/10 hover:bg-white/[0.09]"
          onClick={() => alert("Downloading protocol PDF...")}
        >
          Download Full Protocol (PDF)
        </button>
      </div>
    </Card>
  );
};

/* ---------- History Table ---------- */

const StatusPill: React.FC<{ status: HistoryStatus }> = ({ status }) => {
  if (status === "Completed") return <Badge text="● Completed" tone="green" />;
  if (status === "Missed Slot")
    return <Badge text="● Missed Slot" tone="red" />;
  return <Badge text="Rejected (Doc)" tone="gray" />;
};

const ActionIcon: React.FC<{
  kind: "eye" | "refresh" | "info";
  status: HistoryStatus;
}> = ({ kind, status }) => {
  const IconComp =
    kind === "eye" ? Icon.Eye : kind === "refresh" ? Icon.Refresh : Icon.Info;

  const handleClick = () => {
    if (status === "Completed") {
      alert("Viewing completed appointment details");
    } else if (status === "Missed Slot") {
      alert("Rebooking missed slot...");
    } else {
      alert("Viewing rejection details and required documents");
    }
  };

  return (
    <button
      className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.03] ring-1 ring-white/10 hover:bg-white/[0.07] text-white/60"
      onClick={handleClick}
    >
      <IconComp className="h-5 w-5" />
    </button>
  );
};

const RecentHistory: React.FC<{ rows: HistoryRow[] }> = ({ rows }) => {
  const actionFor = (s: HistoryStatus): "eye" | "refresh" | "info" => {
    if (s === "Completed") return "eye";
    if (s === "Missed Slot") return "refresh";
    return "info";
  };

  const handleFilter = () => {
    alert("Opening filter options...");
  };

  const handleExport = () => {
    alert("Exporting history to CSV...");
  };

  return (
    <Card className="p-0 overflow-hidden">
      <div className="px-6 py-5">
        <div className="flex items-center justify-between gap-4">
          <div className="text-xl font-semibold text-white/90">
            Recent History
          </div>

          <div className="flex items-center gap-2">
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/75 ring-1 ring-white/10 hover:bg-white/[0.08]"
              onClick={handleFilter}
            >
              <Icon.Filter className="h-4 w-4" />
              Filter
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/75 ring-1 ring-white/10 hover:bg-white/[0.08]"
              onClick={handleExport}
            >
              <Icon.Export className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="grid grid-cols-12 gap-4 bg-white/[0.03] px-6 py-4 text-[11px] font-semibold tracking-wide text-white/45">
          <div className="col-span-3">DATE &amp; TIME</div>
          <div className="col-span-2">RDV ID</div>
          <div className="col-span-4">VEHICLE / TRAILER</div>
          <div className="col-span-2">STATUS</div>
          <div className="col-span-1 text-right">ACTIONS</div>
        </div>

        {rows.map((r, idx) => (
          <div
            key={r.rdv}
            className={cx(
              "grid grid-cols-12 gap-4 px-6 py-5",
              idx !== 0 && "border-t border-white/10",
            )}
          >
            <div className="col-span-3">
              <div className="text-sm font-semibold text-white/85">
                {r.date}
              </div>
              <div className="mt-1 text-sm text-white/40">{r.timeRange}</div>
            </div>

            <div className="col-span-2">
              <a
                href="#"
                className="text-sm font-semibold text-sky-300 hover:text-sky-200"
              >
                {r.rdv}
              </a>
            </div>

            <div className="col-span-4">
              <div className="text-sm font-semibold text-white/85">
                {r.vehicle}
              </div>
              <div className="mt-1 text-sm text-white/40">{r.trailer}</div>
            </div>

            <div className="col-span-2 flex items-center">
              <StatusPill status={r.status} />
            </div>

            <div className="col-span-1 flex justify-end">
              <ActionIcon kind={actionFor(r.status)} status={r.status} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-white/10 px-6 py-4">
        <div className="text-sm text-white/40">
          Showing 3 of 152 history entries
        </div>
        <div className="flex items-center gap-2">
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.03] ring-1 ring-white/10 hover:bg-white/[0.07] text-white/60"
            onClick={() => alert("Previous page")}
          >
            <Icon.ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.03] ring-1 ring-white/10 hover:bg-white/[0.07] text-white/60"
            onClick={() => alert("Next page")}
          >
            <Icon.ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Card>
  );
};

/* ---------- MAIN DASHBOARD (rafce style) ---------- */

const CarrierDashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats: Stat[] = [
    { label: "On-time Rate", value: "94.2%", accent: "blue" },
    { label: "Missed Slots", value: 3, accent: "orange" },
    { label: "Pending", value: 12, accent: "gray" },
  ];

  const appointments: Appointment[] = [
    {
      time: "09:30 - 10:00",
      plate: "AB-123-CD",
      gate: "GATE A-04",
      status: "CONFIRMED",
      footerLeft: "Next Step: Security Check",
      footerAction: "Details",
      footerActionTone: "blue",
      iconTone: "blue",
    },
    {
      time: "11:15 - 11:45",
      plate: "EF-456-GH",
      gate: "GATE B-12",
      status: "PENDING DOCUMENTATION",
      footerLeft: "Action Required: Upload CMR",
      footerAction: "Fix Now",
      footerActionTone: "orange",
      iconTone: "orange",
    },
  ];

  const history: HistoryRow[] = [
    {
      date: "Oct 24, 2023",
      timeRange: "14:00 - 14:30",
      rdv: "#RDV-99821",
      vehicle: "JK-882-LL",
      trailer: "Curtainside",
      status: "Completed",
    },
    {
      date: "Oct 24, 2023",
      timeRange: "10:30 - 11:00",
      rdv: "#RDV-99754",
      vehicle: "GH-221-OP",
      trailer: "Refrigerated",
      status: "Missed Slot",
    },
    {
      date: "Oct 23, 2023",
      timeRange: "16:45 - 17:15",
      rdv: "#RDV-99712",
      vehicle: "TY-001-QR",
      trailer: "Container",
      status: "Rejected (Doc)",
    },
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-220px] top-[-220px] h-[520px] w-[520px] rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute right-[-180px] top-[120px] h-[520px] w-[520px] rounded-full bg-orange-500/8 blur-3xl" />
        <div className="absolute left-[35%] bottom-[-260px] h-[520px] w-[520px] rounded-full bg-emerald-500/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 py-8">
        {/* Header row */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-white/95">
              Carrier Dashboard
            </h1>
            <p className="mt-2 text-base text-white/45">
              Real-time gate management and appointment tracking
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            {stats.map((s) => (
              <StatChip key={s.label} stat={s} />
            ))}
          </div>
        </div>

        {/* Active appointments + rules */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon.Calendar className="h-5 w-5 text-sky-300" />
                <div className="text-xl font-semibold text-white/90">
                  Active Appointments
                </div>
              </div>

              <button
                className="text-sm font-semibold text-sky-300 hover:text-sky-200"
                onClick={() => navigate("/carrier/appointments")}
              >
                View All
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              {appointments.map((a) => (
                <AppointmentCard key={a.time + a.plate} appt={a} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <GateEntryRules />
          </div>
        </div>

        <Trackmap />

        {/* Recent history */}
        <div className="mt-10">
          <RecentHistory rows={history} />
        </div>
      </div>
      <Ai />
    </div>
  );
};

export default CarrierDashboard;
