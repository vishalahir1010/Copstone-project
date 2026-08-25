import api from "./api";

export const loginUser = async (
  credentials
) => {
  return api.post(
    "/auth/login",
    credentials
  );
};

export const registerUser = async (
  userData
) => {
  return api.post(
    "/auth/register",
    userData
  );
};

export const getCurrentUser = async () => {
  return api.get("/auth/me");
};

export const logoutUser = async () => {
  try {
    return await api.post(
      "/auth/logout"
    );
  } catch (error) {
    console.warn(
      "Logout API failed:",
      error
    );

    return null;
  }
};

export const forgotPassword = async (
  email
) => {
  return api.post(
    "/auth/forgot-password",
    { email }
  );
};

export const resetPassword = async (
  token,
  password
) => {
  return api.post(
    `/auth/reset-password/${token}`,
    { password }
  );
};

export default {
  loginUser,
  registerUser,
  getCurrentUser,
  logoutUser,
  forgotPassword,
  resetPassword,
};