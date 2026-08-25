import React from "react";
import { Music, Plus } from "lucide-react";
import "./styles/variables.css";
import "./styles/global.css";
import "./styles/components.css";
import "./styles/responsive.css";

const EmptyState = ({
  title = "Nothing here yet",
  description = "There is no content to display.",
  actionText,
  onAction,
  icon,
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        {icon || <Music size={28} />}
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      {actionText && onAction && (
        <button
          className="btn btn-primary"
          onClick={onAction}
        >
          <Plus size={17} />
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;