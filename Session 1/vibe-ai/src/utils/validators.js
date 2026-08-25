export const isRequired = (
  value
) => {
  return (
    value !== undefined &&
    value !== null &&
    String(value).trim() !== ""
  );
};

export const isValidEmail = (
  email
) => {
  if (!email) return false;

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );
};

export const isValidPassword = (
  password
) => {
  return (
    typeof password === "string" &&
    password.length >= 6
  );
};

export const isValidPhone = (
  phone
) => {
  if (!phone) return false;

  return /^[6-9]\d{9}$/.test(
    String(phone).replace(
      /\s+/g,
      ""
    )
  );
};

export const validateLogin = ({
  email,
  password,
}) => {
  const errors = {};

  if (!isRequired(email)) {
    errors.email =
      "Email is required.";
  } else if (!isValidEmail(email)) {
    errors.email =
      "Enter a valid email address.";
  }

  if (!isRequired(password)) {
    errors.password =
      "Password is required.";
  } else if (
    !isValidPassword(password)
  ) {
    errors.password =
      "Password must contain at least 6 characters.";
  }

  return errors;
};

export const validateRegister = ({
  name,
  email,
  password,
  confirmPassword,
}) => {
  const errors = {};

  if (!isRequired(name)) {
    errors.name =
      "Name is required.";
  } else if (
    name.trim().length < 2
  ) {
    errors.name =
      "Name must contain at least 2 characters.";
  }

  if (!isRequired(email)) {
    errors.email =
      "Email is required.";
  } else if (!isValidEmail(email)) {
    errors.email =
      "Enter a valid email address.";
  }

  if (!isRequired(password)) {
    errors.password =
      "Password is required.";
  } else if (
    !isValidPassword(password)
  ) {
    errors.password =
      "Password must contain at least 6 characters.";
  }

  if (!isRequired(confirmPassword)) {
    errors.confirmPassword =
      "Please confirm your password.";
  } else if (
    password !== confirmPassword
  ) {
    errors.confirmPassword =
      "Passwords do not match.";
  }

  return errors;
};

export const validateContact = ({
  name,
  email,
  subject,
  message,
}) => {
  const errors = {};

  if (!isRequired(name)) {
    errors.name =
      "Name is required.";
  }

  if (!isRequired(email)) {
    errors.email =
      "Email is required.";
  } else if (!isValidEmail(email)) {
    errors.email =
      "Enter a valid email address.";
  }

  if (!isRequired(subject)) {
    errors.subject =
      "Subject is required.";
  }

  if (!isRequired(message)) {
    errors.message =
      "Message is required.";
  } else if (
    message.trim().length < 10
  ) {
    errors.message =
      "Message must contain at least 10 characters.";
  }

  return errors;
};

export const validatePlaylist = ({
  name,
}) => {
  const errors = {};

  if (!isRequired(name)) {
    errors.name =
      "Playlist name is required.";
  } else if (
    name.trim().length < 2
  ) {
    errors.name =
      "Playlist name is too short.";
  }

  return errors;
};