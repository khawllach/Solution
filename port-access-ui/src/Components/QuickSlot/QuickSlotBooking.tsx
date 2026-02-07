import React, { useMemo, useState } from "react";
import { Plus } from "lucide-react";

type SlotStatus = "Available" | "Filling Fast" | "Full";

type SlotRow = {
  time: string;
  capacityPct: number;
  status: SlotStatus;
};

const initialSlots: SlotRow[] = [
  { time: "15:00 - 15:30", capacityPct: 40, status: "Available" },
  { time: "15:30 - 16:00", capacityPct: 85, status: "Filling Fast" },
  { time: "16:00 - 16:30", capacityPct: 100, status: "Full" },
];

const QuickSlotBooking: React.FC = () => {
  const [terminal, setTerminal] = useState("Terminal A (Main)");
  const [gate, setGate] = useState("Gate 12 - Bulk");
  const [truck, setTruck] = useState("ABC-1234 (Scan)");

  const rows = useMemo(() => initialSlots, []);

  return (
    <section className="qs-card">
      <div className="qs-header">
        <span className="qs-iconSq">
          <Plus size={16} />
        </span>
        <h3 className="qs-title">Quick Slot Booking</h3>
      </div>

      <div className="qs-filters">
        <div className="qs-field">
          <div className="qs-label">TERMINAL</div>
          <select
            value={terminal}
            onChange={(e) => setTerminal(e.target.value)}
          >
            <option>Terminal A (Main)</option>
            <option>Terminal 4A</option>
            <option>Terminal B</option>
          </select>
        </div>

        <div className="qs-field">
          <div className="qs-label">GATE</div>
          <select value={gate} onChange={(e) => setGate(e.target.value)}>
            <option>Gate 12 - Bulk</option>
            <option>Gate 04 - Express</option>
            <option>Gate 01 - Standard</option>
          </select>
        </div>

        <div className="qs-field">
          <div className="qs-label">TRUCK</div>
          <select value={truck} onChange={(e) => setTruck(e.target.value)}>
            <option>ABC-1234 (Scan)</option>
            <option>SL-4922 (DHL)</option>
            <option>MA-0911</option>
          </select>
        </div>

        <button className="qs-btnPrimary">Check Availability</button>
      </div>

      <div className="qs-table">
        <div className="qs-thead">
          <div>TIME SLOT</div>
          <div>CAPACITY</div>
          <div>STATUS</div>
          <div className="qs-right">ACTION</div>
        </div>

        {rows.map((r) => {
          const fillClass =
            r.status === "Available"
              ? "ok"
              : r.status === "Filling Fast"
                ? "warn"
                : "bad";
          const statusClass = fillClass;
          const isFull = r.status === "Full";

          return (
            <div className="qs-trow" key={r.time}>
              <div className="qs-cell">{r.time}</div>

              <div className="qs-cell">
                <div className="qs-cap">
                  <div className="qs-capTrack">
                    <div
                      className={`qs-capFill ${fillClass}`}
                      style={{ width: `${r.capacityPct}%` }}
                    />
                  </div>
                  <div className="qs-capPct">{r.capacityPct}%</div>
                </div>
              </div>

              <div className={`qs-cell qs-status ${statusClass}`}>
                {r.status}
              </div>

              <div className="qs-cell qs-right">
                <button
                  className={`qs-action ${isFull ? "muted" : ""}`}
                  disabled={isFull}
                >
                  {isFull ? "Waitlist" : "Book Now"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default QuickSlotBooking;
