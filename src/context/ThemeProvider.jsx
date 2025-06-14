import { createContext,  useState, useContext, useEffect } from "react";

import storage from "../utils/Storage";
import handleGlobalError from "../utils/GlobalErrorHandler";

const ThemeContext = createContext();
export const useThemeContext = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [ theme, setTheme ] = useState(null);

  const toggleTheme = async () => {
    try {
      const newTheme =  theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      storage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    } catch (error) {
      handleGlobalError(error);
    }
  };

  useEffect(() => {
    // check storage
    let currentTheme = storage.getItem("theme");

    // if no theme in storage, then check system's preferred theme
    if (!currentTheme) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      currentTheme = prefersDark ? "dark" : "light";
    }

    setTheme(currentTheme);
    document.documentElement.classList.toggle("dark", currentTheme === "dark");
  },  [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
};

export default ThemeProvider;