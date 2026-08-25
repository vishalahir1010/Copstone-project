import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);

const USER_KEY = "vibeai_user";
const TOKEN_KEY = "vibeai_token";
const USERS_KEY = "vibeai_users";

const getStoredUsers = () => {
  try {
    const users = JSON.parse(
      localStorage.getItem(USERS_KEY) || "[]"
    );

    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
};

const getStoredUser = () => {
  try {
    const user = JSON.parse(
      localStorage.getItem(USER_KEY) || "null"
    );

    return user;
  } catch {
    return null;
  }
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = Boolean(user);

  useEffect(() => {
    const storedUser = getStoredUser();

    setUser(storedUser);
    setLoading(false);
  }, []);

  const register = useCallback(
    ({ name, email, password }) => {
      const trimmedName = name.trim();
      const normalizedEmail =
        email.trim().toLowerCase();

      if (!trimmedName) {
        return {
          success: false,
          message: "Name is required.",
        };
      }

      if (!normalizedEmail) {
        return {
          success: false,
          message: "Email is required.",
        };
      }

      if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
        return {
          success: false,
          message: "Please enter a valid email.",
        };
      }

      if (password.length < 6) {
        return {
          success: false,
          message:
            "Password must contain at least 6 characters.",
        };
      }

      const users = getStoredUsers();

      const existingUser = users.find(
        (item) => item.email === normalizedEmail
      );

      if (existingUser) {
        return {
          success: false,
          message:
            "An account with this email already exists.",
        };
      }

      const newUser = {
        id: Date.now(),
        name: trimmedName,
        email: normalizedEmail,
        password,
        role: "user",
        avatar: "",
        createdAt: new Date().toISOString(),
      };

      const updatedUsers = [
        ...users,
        newUser,
      ];

      localStorage.setItem(
        USERS_KEY,
        JSON.stringify(updatedUsers)
      );

      const safeUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar,
        createdAt: newUser.createdAt,
      };

      localStorage.setItem(
        USER_KEY,
        JSON.stringify(safeUser)
      );

      localStorage.setItem(
        TOKEN_KEY,
        `vibeai-${newUser.id}-${Date.now()}`
      );

      setUser(safeUser);

      return {
        success: true,
        user: safeUser,
      };
    },
    []
  );

  const login = useCallback(
    ({ email, password }) => {
      const normalizedEmail =
        email.trim().toLowerCase();

      if (!normalizedEmail || !password) {
        return {
          success: false,
          message:
            "Email and password are required.",
        };
      }

      const users = getStoredUsers();

      /*
       * Development/demo account.
       * This is intentionally local-only because
       * this project does not use a backend.
       */
      if (
        normalizedEmail ===
          "demo@vibeai.com" &&
        password === "123456"
      ) {
        const demoUser = {
          id: 1,
          name: "VibeAI User",
          email: "demo@vibeai.com",
          role: "user",
          avatar: "",
          createdAt:
            new Date().toISOString(),
        };

        localStorage.setItem(
          USER_KEY,
          JSON.stringify(demoUser)
        );

        localStorage.setItem(
          TOKEN_KEY,
          `vibeai-demo-${Date.now()}`
        );

        setUser(demoUser);

        return {
          success: true,
          user: demoUser,
        };
      }

      const existingUser = users.find(
        (item) =>
          item.email === normalizedEmail
      );

      if (!existingUser) {
        return {
          success: false,
          message:
            "No account found with this email.",
        };
      }

      if (
        existingUser.password !== password
      ) {
        return {
          success: false,
          message:
            "Incorrect password.",
        };
      }

      const safeUser = {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        avatar: existingUser.avatar || "",
        createdAt:
          existingUser.createdAt,
      };

      localStorage.setItem(
        USER_KEY,
        JSON.stringify(safeUser)
      );

      localStorage.setItem(
        TOKEN_KEY,
        `vibeai-${existingUser.id}-${Date.now()}`
      );

      setUser(safeUser);

      return {
        success: true,
        user: safeUser,
      };
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);

    setUser(null);
  }, []);

  const updateProfile = useCallback(
    (updates) => {
      if (!user) {
        return {
          success: false,
          message: "You are not logged in.",
        };
      }

      const updatedUser = {
        ...user,
        ...updates,
      };

      const users = getStoredUsers();

      const updatedUsers = users.map(
        (item) => {
          if (item.id !== user.id) {
            return item;
          }

          return {
            ...item,
            ...updates,
          };
        }
      );

      localStorage.setItem(
        USERS_KEY,
        JSON.stringify(updatedUsers)
      );

      localStorage.setItem(
        USER_KEY,
        JSON.stringify(updatedUser)
      );

      setUser(updatedUser);

      return {
        success: true,
        user: updatedUser,
      };
    },
    [user]
  );

  const changePassword = useCallback(
    ({
      currentPassword,
      newPassword,
      confirmPassword,
    }) => {
      if (!user) {
        return {
          success: false,
          message: "You are not logged in.",
        };
      }

      const users = getStoredUsers();

      const existingUser = users.find(
        (item) => item.id === user.id
      );

      if (!existingUser) {
        return {
          success: false,
          message: "User account not found.",
        };
      }

      if (
        existingUser.password !==
        currentPassword
      ) {
        return {
          success: false,
          message:
            "Current password is incorrect.",
        };
      }

      if (newPassword.length < 6) {
        return {
          success: false,
          message:
            "New password must contain at least 6 characters.",
        };
      }

      if (
        newPassword !== confirmPassword
      ) {
        return {
          success: false,
          message:
            "New passwords do not match.",
        };
      }

      const updatedUsers = users.map(
        (item) => {
          if (item.id !== user.id) {
            return item;
          }

          return {
            ...item,
            password: newPassword,
          };
        }
      );

      localStorage.setItem(
        USERS_KEY,
        JSON.stringify(updatedUsers)
      );

      return {
        success: true,
        message:
          "Password changed successfully.",
      };
    },
    [user]
  );

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated,
      register,
      login,
      logout,
      updateProfile,
      changePassword,
    }),
    [
      user,
      loading,
      isAuthenticated,
      register,
      login,
      logout,
      updateProfile,
      changePassword,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }

  return context;
};

export default AuthContext;

export { AuthProvider };