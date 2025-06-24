import { useState } from "react";
import { LuCircleHelp } from "react-icons/lu";

import { cn } from "../utils/ClassName";

const StatDisplay = ({ stat, containerStyles}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const { code, description, icon, level, totalPointToNextLevel, thisLevelAccPoint } = stat;
  const progressPercent = `${thisLevelAccPoint / totalPointToNextLevel * 100}%`;
  const { tooltip_text } = description;

  return (
    <div className={cn("flex flex-row", containerStyles)}>
      <div className="flex-1 text-left h-full">
        <p className="text-2xl">{icon}</p>
      </div>

      <div className="flex-5 flex flex-col text-right">
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center">
            <p className="text-sm font-bold">{code}</p>
            <div className="relative group inline-block">
              <LuCircleHelp 
                className="ml-1 h-4 w-4 cursor-pointer"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              />
              {showTooltip && (
                <div className="absolute text-left mt-2 max-w-[270px] w-max whitespace-normal bg-blue-100 text-blue text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  {tooltip_text}
                </div>
              )}
            </div>
            
          </div>
          <p className="flex-1 text-xs text-right">Level {level}</p>
        </div>
        <div className="relative h-1 mt-1">
          <div className="absolute z-3 left-0 rounded-full h-1 bg-gray-300 border-1 border-gray-400" style={{width: progressPercent}}></div>
          <div className="absolute z-2 left-0 rounded-full w-full h-1 bg-transparent border-1 border-gray-400"></div>
        </div>
      </div>
    </div>
  )
};

export default StatDisplay;