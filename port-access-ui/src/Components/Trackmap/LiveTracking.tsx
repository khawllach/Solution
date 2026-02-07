// src/components/Tracking/LiveTracking.tsx
import React, { useState } from "react";

const LiveTracking: React.FC = () => {
  const [zoom, setZoom] = useState(1);
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.6));

  return (
    <div className="min-h-screen text-[#e7eef8] py-7 px-7">
      <div className="flex items-center justify-between mb-5">
        <div className="text-3xl font-black tracking-tight">
          <span className="text-[#1f8bff] mr-2">distance</span>
          <span className="text-[#eaf2ff]">Live Tracking</span>
        </div>

        <div className="inline-flex items-center gap-2.5 text-[#e7eef8]/75 font-black tracking-[0.12em] text-[13px]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] shadow-[0_0_0_6px_rgba(34,197,94,0.12)]" />
          <span>LIVE FEED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 items-start">
        {/* Left Map Panel */}
        <section className="rounded-2xl bg-white/[0.06] border border-white/[0.08] shadow-[0_26px_70px_rgba(116,116,116,0.35)] overflow-hidden">
          <div className="relative h-[520px] lg:h-[520px] border-2 border-[#575757] bg-[radial-gradient(700px_500px_at_55%_40%,rgba(31,139,255,0.12)_0%,rgba(7,15,24,0)_55%),linear-gradient(180deg,rgba(9,19,33,0.8),rgba(7,14,24,0.9))]">
            {/* dotted grid */}
            <div className="absolute inset-0 opacity-[0.32] bg-[radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[length:34px_34px]" />

            {/* soft route line */}
            <svg
              className="absolute inset-0 opacity-90"
              viewBox="0 0 900 420"
              preserveAspectRatio="none"
            >
              <path
                d="M-20 260 C 120 180, 210 210, 320 265 S 560 380, 740 245 S 940 190, 980 290"
                fill="none"
                stroke="rgba(255,255,255,0.13)"
                strokeWidth="7"
              />
              <path
                d="M-30 320 C 120 330, 240 350, 390 315 S 610 220, 760 300 S 910 390, 1010 340"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="3"
              />
            </svg>

            {/* Destination label */}
            <div className="absolute left-[64%] top-[28%] -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-[30px] font-black text-[#1f8bff] shadow-[0_18px_40px_rgba(31,139,255,0.25)] leading-none">
                location_on
              </div>
              <div className="inline-flex items-center justify-center px-3 py-1.5 mt-2.5 rounded-lg font-black tracking-wider text-[10px] text-[#eaf2ff] bg-[#1f8bff]/90 shadow-[0_14px_34px_rgba(31,139,255,0.22)]">
                GATE A-04
              </div>
            </div>

            {/* Origin label */}
            <div className="absolute left-[18%] bottom-[20%] -translate-x-1/2 translate-y-1/2 text-center">
              <div className="inline-flex items-center justify-center px-4 py-3 rounded-full border-2 border-[#1f8bff]/95 bg-[#1f8bff]/10 text-[#1f8bff] text-[25px] font-black tracking-tight shadow-[0_22px_50px_rgba(0,0,0,0.35)]">
                (local_shipping)
              </div>
              <div className="mt-2.5 font-black tracking-[0.12em] text-[13px] text-[#eaf2ff]/85">
                AB-123-CD
              </div>
            </div>

            {/* Tiny controls */}
            <div className="absolute right-4 bottom-4 flex flex-col gap-2.5">
              <button
                className="h-[46px] w-20 rounded-lg border border-white/10 bg-white/[0.06] text-[#eaf2ff]/85 font-black hover:bg-white/10 transition-colors"
                type="button"
                onClick={handleZoomIn}
                title="Zoom In"
              >
                add
              </button>
              <button
                className="h-[46px] w-20 rounded-lg border border-white/10 bg-white/[0.06] text-[#eaf2ff]/85 font-black hover:bg-white/10 transition-colors"
                type="button"
                onClick={handleZoomOut}
                title="Zoom Out"
              >
                remove
              </button>
              <div className="text-center text-xs text-[#eaf2ff]/60 mt-1">
                {Math.round(zoom * 100)}%
              </div>
            </div>
          </div>
        </section>

        {/* Right Info Panel */}
        <aside className="rounded-2xl bg-white/[0.06] border-2 border-[#575757] shadow-[0_26px_70px_rgba(116,116,116,0.35)] overflow-hidden p-5">
          <div className="text-[15px] font-black tracking-[0.08em] text-[#eaf2ff]/60 py-2.5 px-1.5 pb-4">
            TRAVEL INFORMATION
          </div>

          <div className="flex flex-col gap-4 px-1.5">
            <div className="grid grid-cols-[70px_1fr] gap-4 items-center">
              <div className="h-[58px] w-[68px] rounded-xl grid place-items-center bg-[#1f8bff]/12 text-[#1f8bff] font-medium text-[15px]">
                timer
              </div>
              <div>
                <div className="text-[#eaf2ff]/60 font-extrabold text-sm">
                  Estimated Arrival (ETA)
                </div>
                <div className="mt-1.5 text-3xl font-black text-[#eaf2ff]/96">
                  09:12 AM
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[70px_1fr] gap-4 items-center">
              <div className="h-[58px] w-[58px] rounded-xl grid place-items-center bg-[#22c55e]/12 text-[#22c55e] font-medium text-[15px]">
                map
              </div>
              <div>
                <div className="text-[#eaf2ff]/60 font-extrabold text-sm">
                  Distance Remaining
                </div>
                <div className="mt-1.5 text-3xl font-black text-[#eaf2ff]/96">
                  15.4 km
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[70px_1fr] gap-4 items-center">
              <div className="h-[58px] w-[68px] rounded-xl grid place-items-center bg-[#1f8bff]/12 text-[#1f8bff] font-medium text-[15px]">
                moving
              </div>
              <div>
                <div className="text-[#eaf2ff]/60 font-extrabold text-sm">
                  Current Status
                </div>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="text-[28px] font-black text-[#eaf2ff]/96">
                    In Transit
                  </div>
                  <span className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-lg text-xs font-black tracking-[0.08em] text-[#1f8bff] border border-[#1f8bff]/30 bg-[#1f8bff]/12">
                    ON TRACK
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            className="mt-6 w-full h-[78px] rounded-xl border border-white/10 bg-white/[0.06] flex items-center justify-between px-4 hover:bg-white/10 text-[#eaf2ff]/95 font-black text-xl"
            type="button"
          >
            <div className="w-[140px] h-[58px] rounded-xl grid place-items-center bg-white/[0.06] text-[#eaf2ff]/90 font-medium text-[15px]">
              contact_phone
            </div>
            <span className="ml-3 flex-1 text-left">Contact Driver</span>
          </button>
        </aside>
      </div>
    </div>
  );
};

export default LiveTracking;
