import React from "react";

const Loader = ({
  size = "medium",
  text = "",
  fullScreen = false,
}) => {
  return (
    <div
      className={`loader-wrapper ${
        fullScreen ? "loader-fullscreen" : ""
      }`}
    >
      <div
        className={`loader loader-${size}`}
        aria-label="Loading"
      />

      {text && (
        <span className="loader-text">
          {text}
        </span>
      )}
    </div>
  );
};

export default Loader;