import React from "react";
import { Send } from "lucide-react";

const AIAssistant: React.FC = () => {
  return (
    <section className="ai">
      <div className="ai-header">🤖 Logistics AI Assistant</div>

      <div className="ai-message">
        Hello! I can help you analyze gate throughput and truck arrivals.
        What would you like to know?
      </div>

      <div className="ai-suggestions">
        <button>"How many trucks at Gate 1 between 10–12?"</button>
        <button>"Predict congestion for Gate 3 at 15:00"</button>
      </div>

      <div className="ai-input">
        <input placeholder="Ask AI anything..." />
        <Send size={18} />
      </div>

      <div className="ai-footer">Node: US-EAST-01 • v2.4.12-PRO</div>
    </section>
  );
};

export default AIAssistant;