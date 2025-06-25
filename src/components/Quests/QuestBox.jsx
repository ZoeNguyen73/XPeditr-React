import { useState } from "react";

import { LuChevronRight, LuChevronsDown } from "react-icons/lu";

import { cn } from "../../utils/ClassName";

const QuestBox = ({ quest }) => {
  const { title, type } = quest;
  const baseStyles = "bg-bg-blue rounded-xl py-2 px-4 text-base text-left tracking-wide";
  let typeName;
  let borderStyles;
  
  if (type === "epic") {
    typeName = "Epic Quest";
    borderStyles = "border-l-2 border-red";
  } else if (type === "major") {
    typeName = "Major Quest";
    borderStyles = "border-l-2 border-orange";
  } else if (type === "minor") {
    typeName = "Minor Quest";
    borderStyles = "border-l-2 border-yellow";
  }
  
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={cn(baseStyles, borderStyles)}>
      <div className="flex flex-row items-center gap-2">
        <div 
          className="rounded-full bg-white/30 h-[22px] w-[22px] flex justify-center items-center cursor-pointer"
          onClick={toggleExpanded}
        >
          {expanded && (<LuChevronsDown color="black" size="16px"/>)}
          {!expanded && (<LuChevronRight color="black" size="16px"/>)}
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-gray text-xs mt-0.5">{typeName} • 65%</p>
        </div>
        
      </div>  
      
    </div>
  )
};

export default QuestBox;