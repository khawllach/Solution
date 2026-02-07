import React from "react";

type AlertType = "urgent" | "warning" | "info";

interface Props {
  type: AlertType;
  title: string;
  description: string;
  time: string;
  actions?: boolean;
}

const AlertCard: React.FC<Props> = ({
  type,
  title,
  description,
  time,
  actions
}) => {
  return (
    <div className={`alert-card ${type}`}>
      <div className="alert-header">
        <span className="alert-title">{title}</span>
        <span className="alert-time">{time}</span>
      </div>

      <p className="alert-desc">{description}</p>

      {actions && (
        <div className="alert-actions">
          <button className="btn danger">REDIRECT</button>
          <button className="btn">DISMISS</button>
        </div>
      )}
    </div>
  );
};

export default AlertCard;
