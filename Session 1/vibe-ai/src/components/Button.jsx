import React from "react";
import Loader from "./Loader";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  icon = null,
  type = "button",
  fullWidth = false,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${
        fullWidth ? "btn-full" : ""
      }`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? (
        <Loader size="small" />
      ) : (
        <>
          {icon}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

export default Button;