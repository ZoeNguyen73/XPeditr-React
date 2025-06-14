import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";

import { useThemeContext } from "../../context/ThemeProvider";

function SiteHeader() {
  const { theme, toggleTheme } = useThemeContext();
  return (
    <div>
      <div className="text-9xl font-accent font-semibold text-text">
        SiteHeader
      </div>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-full transition bg-background"
        aria-label="Toggle Theme"
      >
        {theme === "dark" ? (
          <FiMoon className="text-yellow-400 w-6 h-6" />
        ) : (
          <FiSun className="text-gray-800 w-6 h-6" />
        )}
      </button>

    </div>
  )
};

export default SiteHeader;