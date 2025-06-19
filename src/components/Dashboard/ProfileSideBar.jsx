import { FiSun, FiMoon } from "react-icons/fi";
import { LuCircleHelp } from "react-icons/lu";

import { useThemeContext } from "../../context/ThemeProvider";

import Avatar from "../Avatar/Avatar";

import images from "../../constants/images";

const ProfileSideBar = () => {
  const { theme, toggleTheme } = useThemeContext();
  const bgImg = theme === "dark"
    ? "bg_purple_sky"
    : "bg_mint_sky";

  return (
    <div 
      className="relative rounded-xl h-full w-full"
      style={{
        backgroundImage: `url('${images[bgImg]}')`,
        backgroundSize: "cover",
        backgroundPosition: "bottom center",
      }}
    >
      <div className={`absolute inset-0 ${theme === "dark" ? "bg-black opacity-75" : "bg-white opacity-60"} z-0 rounded-xl overflow-hidden`}>

      </div>
      
      <button
        onClick={toggleTheme}
        className="absolute top-3 right-3 p-2 rounded-full transition bg-background z-2 cursor-pointer"
        aria-label="Toggle Theme"
      >
        {theme === "dark" ? (
          <FiMoon className="text-yellow w-6 h-6" />
        ) : (
          <FiSun className="text-gray w-6 h-6" />
        )}
      </button>

      <div className="z-1 flex flex-col items-center absolute top-8 left-0 w-full h-full">
        <Avatar avatarName="1a" size="lg"/>

        <p className="text-yellow text-3xl font-accent text-2xl font-medium tracking-wide">Senpot</p>

        <div className="rounded-full px-2 mt-5 bg-gradient-to-tr from-purple-500 to-indigo-800">
          <p className="text-base font-sans font-medium text-white">Level 10</p>
          
        </div>

        <div className="flex flex-row w-5/6 mt-5">
          <p className="text-xs text-text">Experience</p>
          <div className="flex-1"></div>
          <p className="text-xs text-text"><span className="text-yellow font-bold">2,400</span> / 3,750 XP</p>
        </div>

        <div className="px-5 w-5/6 mt-1 relative h-3">
          <div className="absolute z-3 left-0 rounded-full h-3 bg-yellow border-1 border-gray" style={{width: "65%"}}></div>
          <div className="absolute z-2 left-0 rounded-full w-full h-3 border-1 border-gray"></div>
        </div>
        
        <div className="flex flex-row w-5/6 mt-8">
          <p className="text-sm">🪙 Coins</p>
          <div className="flex-1"></div>
          <p className="text-sm text-text font-medium">2,543</p>
        </div>
        <div className="flex flex-row w-5/6 mt-3">
          <p className="text-sm">🔥 Streak</p>
          <div className="flex-1"></div>
          <p className="text-sm text-text font-medium">20 days</p>
        </div>
        <div className="flex flex-row w-5/6 mt-3">
          <p className="text-sm">✅ Tasks done</p>
          <div className="flex-1"></div>
          <p className="text-sm text-text font-medium">6 / 10</p>
        </div>

        <div className="h-[1px] bg-gray w-5/6 mt-7 mb-7"></div>

        <div className="flex flex-row w-5/6">
          <div className="flex-1 text-left h-full">
            <p className="text-2xl">💪</p>
          </div>

          <div className="flex-5 flex flex-col text-right">
            <div className="flex flex-row items-center">

              <div className="flex flex-row items-center">
                <p className="text-sm font-bold">STR</p>
                <LuCircleHelp className="ml-1 h-4 w-4"/>
              </div>
              
              <p className="flex-1 text-xs text-right">Level 4</p>
            </div>
            <div className="relative h-1 mt-1">
              <div className="absolute z-3 left-0 rounded-full h-1 bg-gray-400 border-1 border-gray-400" style={{width: "45%"}}></div>
              <div className="absolute z-2 left-0 rounded-full w-full h-1 bg-transparent border-1 border-gray-400"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-row w-5/6 mt-5">
          <div className="flex-1 text-left h-full">
            <p className="text-2xl">🧠</p>
          </div>

          <div className="flex-5 flex flex-col text-right">
            <div className="flex flex-row items-center">
              <div className="flex flex-row items-center">
                <p className="text-sm font-bold">INT</p>
                <LuCircleHelp className="ml-1 h-4 w-4"/>
              </div>
              <p className="flex-1 text-xs text-right">Level 2</p>
            </div>
            <div className="relative h-1 mt-1">
              <div className="absolute z-3 left-0 rounded-full h-1 bg-gray-300 border-1 border-gray-400" style={{width: "55%"}}></div>
              <div className="absolute z-2 left-0 rounded-full w-full h-1 bg-transparent border-1 border-gray-400y"></div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-row w-5/6 mt-5">
          <div className="flex-1 text-left h-full">
            <p className="text-2xl">😌</p>
          </div>

          <div className="flex-5 flex flex-col text-right">
            <div className="flex flex-row items-center">
              <div className="flex flex-row items-center">
                <p className="text-sm font-bold">WIS</p>
                <LuCircleHelp className="ml-1 h-4 w-4"/>
              </div>
              <p className="flex-1 text-xs text-right">Level 3</p>
            </div>
            <div className="relative h-1 mt-1">
              <div className="absolute z-3 left-0 rounded-full h-1 bg-gray-300 border-1 border-gray-400" style={{width: "90%"}}></div>
              <div className="absolute z-2 left-0 rounded-full w-full h-1 bg-transparent border-1 border-gray-400"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-row w-5/6 mt-5">
          <div className="flex-1 text-left h-full">
            <p className="text-2xl">💬</p>
          </div>

          <div className="flex-5 flex flex-col text-right">
            <div className="flex flex-row items-center">
              <div className="flex flex-row items-center">
                <p className="text-sm font-bold">CHA</p>
                <LuCircleHelp className="ml-1 h-4 w-4"/>
              </div>
              <p className="flex-1 text-xs text-right">Level 1</p>
            </div>
            <div className="relative h-1 mt-1">
              <div className="absolute z-3 left-0 rounded-full h-1 bg-gray-300 border-1 border-gray-400" style={{width: "85%"}}></div>
              <div className="absolute z-2 left-0 rounded-full w-full h-1 bg-transparent border-1 border-gray-400"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-row w-5/6 mt-5">
          <div className="flex-1 text-left h-full">
            <p className="text-2xl">🔧</p>
          </div>

          <div className="flex-5 flex flex-col text-right">
            <div className="flex flex-row items-center">
              <div className="flex flex-row items-center">
                <p className="text-sm font-bold">DEX</p>
                <LuCircleHelp className="ml-1 h-4 w-4"/>
              </div>
              <p className="flex-1 text-xs text-right">Level 3</p>
            </div>
            <div className="relative h-1 mt-1">
              <div className="absolute z-3 left-0 rounded-full h-1 bg-gray-300 border-1 border-gray-400" style={{width: "20%"}}></div>
              <div className="absolute z-2 left-0 rounded-full w-full h-1 bg-transparent border-1 border-gray-400"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-row w-5/6 mt-5">
          <div className="flex-1 text-left h-full">
            <p className="text-2xl">🔮</p>
          </div>

          <div className="flex-5 flex flex-col text-right">
            <div className="flex flex-row items-center">
              <div className="flex flex-row items-center">
                <p className="text-sm font-bold">VIT</p>
                <LuCircleHelp className="ml-1 h-4 w-4"/>
              </div>
              <p className="flex-1 text-xs text-right">Level 2</p>
            </div>
            <div className="relative h-1 mt-1">
              <div className="absolute z-3 left-0 rounded-full h-1 bg-gray-300 border-1 border-gray-400" style={{width: "35%"}}></div>
              <div className="absolute z-2 left-0 rounded-full w-full h-1 bg-transparent border-1 border-gray-400"></div>
            </div>
          </div>
        </div>

      </div>
      
    </div>
  )
};

export default ProfileSideBar;