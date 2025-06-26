import { FiSun, FiMoon } from "react-icons/fi";

import { useThemeContext } from "../context/ThemeProvider";

const ThemeToggle = ({ containerStyles }) => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className={containerStyles}>
      <button
        onClick={toggleTheme}
        className="rounded-full transition bg-background cursor-pointer hover:border-2 border-blue p-2"
        aria-label="Toggle Theme"
      >
        {theme === "dark" ? (
          <FiMoon className="text-yellow w-6 h-6" />
        ) : (
          <FiSun className="text-gray w-6 h-6" />
        )}
      </button>
    </div>
  )
};

export default ThemeToggle;