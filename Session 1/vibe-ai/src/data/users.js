export const users = [
  {
    id: 1,
    name: "Demo User",
    email: "demo@vibeai.com",
    password: "123456",
    role: "user",
    avatar: "",
    createdAt:
      "2026-01-10T10:00:00.000Z",
  },

  {
    id: 2,
    name: "Alex Morgan",
    email: "alex@vibeai.com",
    password: "123456",
    role: "user",
    avatar: "",
    createdAt:
      "2026-02-15T10:00:00.000Z",
  },

  {
    id: 3,
    name: "VibeAI Admin",
    email: "admin@vibeai.com",
    password: "admin123",
    role: "admin",
    avatar: "",
    createdAt:
      "2026-01-01T10:00:00.000Z",
  },
];

export const getUserById = (id) => {
  return users.find(
    (user) =>
      String(user.id) === String(id)
  );
};

export const getUserByEmail = (
  email
) => {
  return users.find(
    (user) =>
      user.email.toLowerCase() ===
      email.trim().toLowerCase()
  );
};

export default users;