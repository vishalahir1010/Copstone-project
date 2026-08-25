import React, { useEffect } from "react";
import {
  CheckCircle,
  Info,
  TriangleAlert,
  X,
} from "lucide-react";

const Toast = ({
  message,
  type = "success",
  visible = false,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [visible, duration, onClose]);

  if (!visible) return null;

  const icons = {
    success: <CheckCircle size={20} />,
    error: <TriangleAlert size={20} />,
    warning: <TriangleAlert size={20} />,
    info: <Info size={20} />,
  };

  return (
    <div
      className={`toast toast-${type}`}
      role="alert"
    >
      <div className="toast-icon">
        {icons[type]}
      </div>

      <span>{message}</span>

      <button
        onClick={onClose}
        aria-label="Close notification"
      >
        <X size={17} />
      </button>
    </div>
  );
};

export default Toast;