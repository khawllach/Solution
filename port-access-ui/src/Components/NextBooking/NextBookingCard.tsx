import React from "react";
import "./NextBookingCard.css";

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
  return (
    <section className="nb-card">
      <div className="nb-left">
        <div className="nb-qr" aria-label="QR code placeholder">
          <div className="nb-qrInner">▦</div>
        </div>
        <button className="nb-btnPrimary">View Digital Pass</button>
      </div>

      <div className="nb-main">
        <div className="nb-top">
          <div>
            <span className="nb-pill nb-success">{booking.status}</span>
            <h2 className="nb-title">{booking.title}</h2>
            <div className="nb-sub">{booking.subtitle}</div>
          </div>

          <div className="nb-slot">
            <div className="nb-slotLabel">{booking.slotLabel}</div>
            <div className="nb-slotTime">
              {booking.slotTime.split("\n").map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="nb-bottom">
          <div className="nb-meta">
            <div className="nb-metaItem">
              <div className="nb-metaLabel">Truck ID</div>
              <div className="nb-metaValue">{booking.truckId}</div>
            </div>
            <div className="nb-metaItem">
              <div className="nb-metaLabel">ETA</div>
              <div className="nb-metaValue">{booking.eta}</div>
            </div>
          </div>

          <div className="nb-actions">
            <button className="nb-btnLink">Modify</button>
            <button className="nb-btnDangerOutline">Cancel Slot</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextBookingCard;
