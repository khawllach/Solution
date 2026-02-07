import React from "react";
import AlertCard from "./AlertCard";

const EventsAlerts: React.FC = () => {
  return (
    <section className="events">
      <div className="events-header">
        <span className="title">
          <span className="dot" /> EVENTS & ALERTS
        </span>
        <span className="live">LIVE</span>
      </div>

      <AlertCard
        type="urgent"
        title="URGENT: Gate 2 Full"
        time="12:44:02"
        description="Congestion detected. 4 trucks in queue exceeding capacity threshold."
        actions
      />

      <AlertCard
        type="info"
        title="Gate 4: Truck Arrival"
        time="12:42:15"
        description="Carrier: DHL Express (SL-4922) arrived at Gate 04."
      />

      <AlertCard
        type="info"
        title="Gate 1: Slot Released"
        time="12:39:58"
        description="Truck (MA-0911) exited Gate 01. Slot now available."
      />

      <AlertCard
        type="warning"
        title="Near Saturation: Gate 3"
        time="12:35:10"
        description="Gate 3 approaching 85% capacity for the 13:00 window."
      />
    </section>
  );
};
export default EventsAlerts;