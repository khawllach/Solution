import React, { useState } from "react";

type NextBooking = {
  status: "Confirmed" | "Pending";
  title: string;
  subtitle: string;
  slotLabel: string;
  slotTime: string;
  truckId: string;
  eta: string;
};

const booking: NextBooking = {
  status: "Confirmed",
  title: "Next Booking: Terminal 4A",
  subtitle: "Gate 12 • Heavy Cargo Lane",
  slotLabel: "SLOT TIME",
  slotTime: "14:30 -\n15:00",
  truckId: "ABC-1234",
  eta: "12 mins",
};

const NextBookingCard: React.FC = () => {
  const [showQR, setShowQR] = useState(false);

  const handleViewPass = () => {
    setShowQR(!showQR);
    if (!showQR) {
      alert("Digital Pass Displayed - Scan QR code at the gate");
    }
  };

  const handleModify = () => {
    alert("Redirecting to modify booking...");
  };

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel this slot?")) {
      alert("Booking cancelled successfully");
    }
  };

  return (
    <section className="rounded-2xl bg-gradient-to-br from-white/8 to-white/4 border border-white/10 p-6 lg:p-8 shadow-2xl overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col items-center gap-4 lg:min-w-[200px]">
          <div
            className={`w-40 h-40 rounded-2xl border-2 flex items-center justify-center text-6xl transition-all ${
              showQR
                ? "bg-white border-white animate-pulse"
                : "bg-white/5 border-white/20 text-white/40"
            }`}
            aria-label="QR code placeholder"
          >
            {showQR ? "▦" : "▢"}
          </div>
          <button
            onClick={handleViewPass}
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold hover:from-sky-600 hover:to-sky-700 transition-all duration-300 shadow-lg hover:shadow-sky-500/25"
          >
            {showQR ? "Hide QR Code" : "View Digital Pass"}
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3">
                {booking.status}
              </span>
              <h2 className="text-2xl font-black text-white mb-2">
                {booking.title}
              </h2>
              <div className="text-white/60">{booking.subtitle}</div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-xs font-semibold text-white/50 mb-1 tracking-wider">
                {booking.slotLabel}
              </div>
              <div className="text-2xl font-black text-white">
                {booking.slotTime.split("\n").map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex gap-8">
              <div>
                <div className="text-xs font-semibold text-white/50 mb-1 tracking-wider">
                  Truck ID
                </div>
                <div className="text-lg font-bold text-white">
                  {booking.truckId}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-white/50 mb-1 tracking-wider">
                  ETA
                </div>
                <div className="text-lg font-bold text-emerald-400">
                  {booking.eta}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleModify}
                className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all"
              >
                Modify
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-semibold hover:bg-red-500/20 transition-all"
              >
                Cancel Slot
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextBookingCard;
