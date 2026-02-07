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
  const [isChecking, setIsChecking] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const rows = useMemo(() => initialSlots, []);

  const handleCheckAvailability = () => {
    setIsChecking(true);
    // Simulate API call
    setTimeout(() => {
      setIsChecking(false);
      alert(`Checking availability for ${terminal}, ${gate}, ${truck}`);
    }, 1000);
  };

  const handleBookSlot = (timeSlot: string, status: SlotStatus) => {
    if (status === "Full") {
      alert(`Slot ${timeSlot} is full. You've been added to the waitlist.`);
    } else {
      setSelectedSlot(timeSlot);
      alert(`Successfully booked slot: ${timeSlot}`);
    }
  };

  return (
    <section className="rounded-2xl bg-white/5 border border-white/10 p-6 lg:p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center">
          <Plus size={18} className="text-sky-400" />
        </span>
        <h3 className="text-xl font-bold text-white">Quick Slot Booking</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <div className="text-xs font-semibold text-white/50 mb-2 tracking-wider">
            TERMINAL
          </div>
          <select
            value={terminal}
            onChange={(e) => setTerminal(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-sky-500 transition-all cursor-pointer"
          >
            <option>Terminal A (Main)</option>
            <option>Terminal 4A</option>
            <option>Terminal B</option>
          </select>
        </div>

        <div>
          <div className="text-xs font-semibold text-white/50 mb-2 tracking-wider">
            GATE
          </div>
          <select
            value={gate}
            onChange={(e) => setGate(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-sky-500 transition-all cursor-pointer"
          >
            <option>Gate 12 - Bulk</option>
            <option>Gate 04 - Express</option>
            <option>Gate 01 - Standard</option>
          </select>
        </div>

        <div>
          <div className="text-xs font-semibold text-white/50 mb-2 tracking-wider">
            TRUCK
          </div>
          <select
            value={truck}
            onChange={(e) => setTruck(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-sky-500 transition-all cursor-pointer"
          >
            <option>ABC-1234 (Scan)</option>
            <option>SL-4922 (DHL)</option>
            <option>MA-0911</option>
          </select>
        </div>

        <button
          onClick={handleCheckAvailability}
          disabled={isChecking}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold hover:from-sky-600 hover:to-sky-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed self-end"
        >
          {isChecking ? "Checking..." : "Check Availability"}
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-[2fr_3fr_1.5fr_1.5fr] gap-4 px-4 py-3 bg-white/5 rounded-t-xl text-xs font-semibold text-white/50 tracking-wider">
            <div>TIME SLOT</div>
            <div>CAPACITY</div>
            <div>STATUS</div>
            <div className="text-right">ACTION</div>
          </div>

          {rows.map((r) => {
            const fillClass =
              r.status === "Available"
                ? "bg-emerald-500"
                : r.status === "Filling Fast"
                  ? "bg-amber-500"
                  : "bg-red-500";
            const statusClass =
              r.status === "Available"
                ? "text-emerald-400"
                : r.status === "Filling Fast"
                  ? "text-amber-400"
                  : "text-red-400";
            const isFull = r.status === "Full";
            const isSelected = selectedSlot === r.time;

            return (
              <div
                className={`grid grid-cols-[2fr_3fr_1.5fr_1.5fr] gap-4 px-4 py-4 border-b border-white/5 hover:bg-white/5 transition-colors ${
                  isSelected ? "bg-sky-500/10 border-sky-500/30" : ""
                }`}
                key={r.time}
              >
                <div className="flex items-center text-white font-medium">
                  {r.time}
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${fillClass}`}
                      style={{ width: `${r.capacityPct}%` }}
                    />
                  </div>
                  <div className="text-sm text-white/70 font-semibold min-w-[3rem]">
                    {r.capacityPct}%
                  </div>
                </div>

                <div
                  className={`flex items-center text-sm font-semibold ${statusClass}`}
                >
                  {r.status}
                </div>

                <div className="flex items-center justify-end">
                  <button
                    onClick={() => handleBookSlot(r.time, r.status)}
                    disabled={isSelected}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                      isFull
                        ? "bg-white/5 text-white/40 border border-white/10 hover:bg-white/10"
                        : isSelected
                          ? "bg-sky-500/20 text-sky-400 border border-sky-500/30 cursor-not-allowed"
                          : "bg-sky-500/10 text-sky-400 border border-sky-500/30 hover:bg-sky-500/20"
                    }`}
                  >
                    {isSelected ? "Booked" : isFull ? "Waitlist" : "Book Now"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickSlotBooking;
