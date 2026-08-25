export const formatNumber = (
  number = 0
) => {
  const value = Number(number);

  if (Number.isNaN(value)) {
    return "0";
  }

  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(
      1
    )}B`;
  }

  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(
      1
    )}M`;
  }

  if (value >= 1000) {
    return `${(value / 1000).toFixed(
      1
    )}K`;
  }

  return value.toString();
};

export const formatDuration = (
  seconds = 0
) => {
  const totalSeconds = Number(seconds);

  if (
    Number.isNaN(totalSeconds) ||
    totalSeconds < 0
  ) {
    return "0:00";
  }

  const minutes = Math.floor(
    totalSeconds / 60
  );

  const remainingSeconds =
    Math.floor(totalSeconds % 60);

  return `${minutes}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};

export const parseDuration = (
  duration = "0:00"
) => {
  const parts = String(duration).split(":");

  if (parts.length !== 2) {
    return 0;
  }

  const minutes = Number(parts[0]);
  const seconds = Number(parts[1]);

  if (
    Number.isNaN(minutes) ||
    Number.isNaN(seconds)
  ) {
    return 0;
  }

  return minutes * 60 + seconds;
};

export const formatDate = (
  date,
  options = {}
) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
      ...options,
    }
  );
};

export const formatDateTime = (
  date
) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleString(
    "en-IN",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  );
};

export const capitalize = (
  value = ""
) => {
  if (!value) return "";

  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
};

export const truncate = (
  value = "",
  maxLength = 100
) => {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(
    0,
    maxLength
  )}...`;
};

export const slugify = (
  value = ""
) => {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(
      /[^\w\s-]/g,
      ""
    )
    .replace(
      /[\s_-]+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      ""
    );
};

export const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 18) {
    return "Good afternoon";
  }

  return "Good evening";
};