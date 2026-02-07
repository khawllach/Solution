// src/components/Tracking/LiveTracking.tsx
import React from "react";
import "./LiveTracking.css";

const LiveTracking: React.FC = () => {
  return (
    <div className="lt-page">
      <div className="lt-header">
        <div className="lt-title">
          <span className="lt-titleAccent">distance</span>{" "}
          <span className="lt-titleMain">Live Tracking</span>
        </div>

        <div className="lt-live">
          <span className="lt-liveDot" />
          <span className="lt-liveText">LIVE FEED</span>
        </div>
      </div>

      <div className="lt-grid">
        {/* Left Map Panel */}
        <section className="lt-mapCard">
          <div className="lt-mapCanvas">
            {/* dotted grid */}
            <div className="lt-dots" />

            {/* soft route line */}
            <svg
              className="lt-route"
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
            <div className="lt-dest">
              <div className="lt-destText">location_on</div>
              <div className="lt-chip">GATE A-04</div>
            </div>

            {/* Origin label */}
            <div className="lt-origin">
              <div className="lt-originPill">(local_shipping)</div>
              <div className="lt-originPlate">AB-123-CD</div>
            </div>

            {/* Tiny controls */}
            <div className="lt-controls">
              <button className="lt-controlBtn" type="button">
                add
              </button>
              <button className="lt-controlBtn" type="button">
                remove
              </button>
            </div>
          </div>
        </section>

        {/* Right Info Panel */}
        <aside className="lt-infoCard">
          <div className="lt-infoHead">TRAVEL INFORMATION</div>

          <div className="lt-infoRows">
            <div className="lt-infoRow">
              <div className="lt-ico lt-ico--blue">timer</div>
              <div className="lt-infoText">
                <div className="lt-infoLabel">Estimated Arrival (ETA)</div>
                <div className="lt-infoValue">09:12 AM</div>
              </div>
            </div>

            <div className="lt-infoRow">
              <div className="lt-ico lt-ico--green">map</div>
              <div className="lt-infoText">
                <div className="lt-infoLabel">Distance Remaining</div>
                <div className="lt-infoValue">15.4 km</div>
              </div>
            </div>

            <div className="lt-infoRow">
              <div className="lt-ico lt-ico--blue">moving</div>
              <div className="lt-infoText lt-infoText--status">
                <div className="lt-infoLabel">Current Status</div>
                <div className="lt-statusLine">
                  <div className="lt-infoValue">In Transit</div>
                  <span className="lt-badge">ON TRACK</span>
                </div>
              </div>
            </div>
          </div>

          <button className="lt-contact" type="button">
            <span className="lt-ico lt-ico--dark">contact_phone</span>
            <span className="lt-contactText">Contact Driver</span>
          </button>
        </aside>
      </div>
    </div>
  );
};

export default LiveTracking;
