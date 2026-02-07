import React from "react";
import EventsAlerts from "./EventsAlerts.tsx";
import AIAssistant from "./AIAssistant.tsx";

const RightPanel: React.FC = () => {
  return (
    <aside className="right-panel">
      <EventsAlerts />
      <AIAssistant />
    </aside>
  );
};

export default RightPanel;
