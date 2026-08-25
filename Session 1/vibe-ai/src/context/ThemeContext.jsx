import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ThemeContext =
  createContext(null);

const THEME_KEY =
  "vibeai_theme";

const getInitialTheme = () => {
  const savedTheme =
    localStorage.getItem(
      THEME_KEY
    );

  if (
    savedTheme === "light" ||
    savedTheme === "dark"
  ) {
    return savedTheme;
  }

  return "dark";
};

const ThemeProvider = ({
  children,
}) => {
  const [theme, setTheme] =
    useState(getInitialTheme);

  useEffect(() => {
    const root =
      document.documentElement;

    root.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem(
      THEME_KEY,
      theme
    );
  }, [theme]);

  const toggleTheme = useCallback(
    () => {
      setTheme((current) =>
        current === "dark"
          ? "light"
          : "dark"
      );
    },
    []
  );

  const setLightTheme =
    useCallback(() => {
      setTheme("light");
    }, []);

  const setDarkTheme =
    useCallback(() => {
      setTheme("dark");
    }, []);

  const isDark =
    theme === "dark";

  const isLight =
    theme === "light";

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      setLightTheme,
      setDarkTheme,
      isDark,
      isLight,
    }),
    [
      theme,
      toggleTheme,
      setLightTheme,
      setDarkTheme,
      isDark,
      isLight,
    ]
  );

  return (
    <ThemeContext.Provider
      value={value}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context =
    useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider."
    );
  }

  return context;
};

export default ThemeContext;

export { ThemeProvider };