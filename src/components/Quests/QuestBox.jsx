import { useState } from "react";

import { LuChevronRight, LuChevronsDown } from "react-icons/lu";

import { cn } from "../../utils/ClassName";

const QuestBox = ({ quest, handlePress, isSelected, index }) => {
  console.log("index:"  + index + ", isSelected: " + isSelected);
  const { title, type } = quest;
  const baseStyles = "rounded-xl py-2 px-4 text-base text-left tracking-wide hover:translate-x-2 transition cursor-pointer";
  let typeName;
  let colorStyles;
  let icon;
  
  if (type === "epic") {
    typeName = "Epic Quest";
    icon = "🏰";
    if (!isSelected) {
      colorStyles = "border-l-2 border-red bg-red/10 hover:bg-red/40";
    } else {
      colorStyles = "border-2 border-red bg-red/80 text-white shadow-md";
    }
  } else if (type === "main") {
    typeName = "Main Quest";
    icon = "🏆";
    if (!isSelected) {
      colorStyles = "border-l-2 border-yellow ml-3 bg-yellow/10 hover:bg-yellow/40";
    } else {
      colorStyles = "border-2 border-yellow ml-3 bg-yellow/80 text-white shadow-md";
    }
  } else if (type === "minor") {
    typeName = "Minor Quest";
    icon = "🎯";
    if (!isSelected) {
      colorStyles = "border-l-2 border-blue ml-6 bg-blue/10 hover:bg-blue/40";
    } else {
      colorStyles = "border-2 border-blue ml-6 bg-blue/80 text-white shadow-md";
    }
  }
  
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div 
      className={cn(baseStyles, colorStyles)}
      onClick={handlePress}
    >
      <div className="flex flex-row items-center gap-2">
        { (type === "epic" || type === "main") && (
          <div 
            className="rounded-full bg-white/30 h-[22px] w-[22px] flex justify-center items-center cursor-pointer"
            onClick={toggleExpanded}
          >
            {expanded && (<LuChevronsDown color="black" size="16px"/>)}
            {!expanded && (<LuChevronRight color="black" size="16px"/>)}
          </div>
        )}
        
        <div>
          <p className="font-medium">{icon} {title}</p>
          <p className={`${isSelected ? "text-zince-400" : "text-gray"} text-xs mt-0.5`}>{typeName} • 65%</p>
        </div>
        
      </div>  
      
    </div>
  )
};

export default QuestBox;