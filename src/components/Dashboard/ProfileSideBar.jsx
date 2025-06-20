import { FiSun, FiMoon } from "react-icons/fi";;

import { useThemeContext } from "../../context/ThemeProvider";

import Avatar from "../Avatar/Avatar";
import StatDisplay from "../StatDisplay";

import images from "../../constants/images";
import icons from "../../constants/icons";

const STATS_DATA = [
  { 
    code: "STR", 
    description: { tooltip_text: "Power through challenges. Earn this when you hit the gym, go for a run, or push yourself physically!"}, 
    icon: "💪", 
    level: 4, 
    totalPointToNextLevel: 200, 
    thisLevelAccPoint: 180,
  },
  { 
    code: "INT", 
    description: { tooltip_text: "Sharpen your mind. Earn this by reading, studying, or learning something new!"}, 
    icon: "🧠", 
    level: 2, 
    totalPointToNextLevel: 100, 
    thisLevelAccPoint: 70,
  },
  { 
    code: "WIS", 
    description: { tooltip_text: "Think before you leap. Earn this when you slow down, reflect, or make mindful decisions."}, 
    icon: "😌", 
    level: 3, 
    totalPointToNextLevel: 200, 
    thisLevelAccPoint: 80,
  },
  { 
    code: "CHA", 
    description: { tooltip_text: "Farm aura and build confidence. Earn this when you connect, communicate, or put yourself out there!"}, 
    icon: "💬", 
    level: 1, 
    totalPointToNextLevel: 100, 
    thisLevelAccPoint: 90,
  },
  { 
    code: "DEX", 
    description: { tooltip_text: "Gain finesse and spring your ideas to life. Earn this by training your craft or building cool things!"}, 
    icon: "🔧", 
    level: 3, 
    totalPointToNextLevel: 200, 
    thisLevelAccPoint: 150,
  },
  { 
    code: "VIT", 
    description: { tooltip_text: "Stay energized and radiant. Earn this when you rest, refuel, or take care of your health!"}, 
    icon: "🔮", 
    level: 2, 
    totalPointToNextLevel: 100, 
    thisLevelAccPoint: 25,
  },
];

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
        className="absolute top-3 right-3 p-2 rounded-full transition bg-background z-2 cursor-pointer hover:border-2 border-blue"
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
          <div className="absolute z-3 left-0 rounded-full h-3 bg-yellow border-1 border-yellow" style={{width: "65%"}}></div>
          <div className="absolute z-2 left-0 rounded-full w-full h-3 border-1 border-yellow"></div>
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

        <div className="h-[1px] bg-gray w-5/6 mt-7 mb-3"></div>

        { STATS_DATA.length > 0 && (
          STATS_DATA.map(stat => 
            <StatDisplay id={stat.code} stat={stat} containerStyles="w-5/6 mt-4" />
          )
        )}

        <div className="h-[1px] bg-gray w-5/6 mt-7 mb-3"></div>
        <div className="w-5/6 flex flex-row justify-evenly mt-2">
          <img src={icons.blue_book} className="w-10 h-10 hover:animate-bounce cursor-pointer"/>
          <img src={icons.bicep} className="w-10 h-10 hover:animate-bounce cursor-pointer"/>
          <img src={icons.purple_potion} className="w-10 h-10 hover:animate-bounce cursor-pointer"/>
          <img src={icons.donut} className="w-10 h-10 hover:animate-bounce cursor-pointer"/>
        </div>

      </div>
      
    </div>
  )
};

export default ProfileSideBar;