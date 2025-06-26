import { useNavigate } from "react-router-dom";

import { useThemeContext } from "../../context/ThemeProvider";

import { cn } from "../../utils/ClassName";

const NAVS = [
  { title: "Dashboard", path: "/dashboard" },
  { title: "Quests", path: "/quests" },
  { title: "Tasks", path: "" },
  { title: "Habits", path: "" },
  { title: "Companions", path: "" },
  { title: "Analytics", path: "" },
  { title: "Settings", path: "" },
];

const NavChip = ({ nav }) => {
  const { theme } = useThemeContext();
  const navigate = useNavigate();

  const baseStyles = theme === "dark"
    ? "hover:bg-bg-blue"
    : "hover:bg-blue"

  const { title, path } = nav;
  return (
    <div className="hover:bg-bg-blue rounded-full px-2 cursor-pointer" onClick={() => navigate(path)}>
      <p className="font-sans text-text tracking-wide text-base hover:font-medium hover:text-blue hover:underline">{title}</p>
    </div>
  )
};

const NavBar = ({ containerStyles }) => {
  return (
    <div className={cn("w-full flex flex-row gap-2 mt-2 justify-center", containerStyles)}>
      {NAVS.length > 0 && (
        NAVS.map(nav => (<NavChip key={nav.title} nav={nav}/>))
      )}
    </div>
  )
};

export default NavBar;