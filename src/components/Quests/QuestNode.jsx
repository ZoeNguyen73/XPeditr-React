import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { LuChevronRight, LuChevronsDown } from "react-icons/lu";

import { cn } from "../../utils/ClassName";

const QuestNode = ({ quest, setSelectedIndex, selectedIndex, dispatch, openState }) => {
  const isOpen = openState[quest.id] ?? true;
  const hasChildren = quest.children && quest.children.length > 0;
  
  const { title, type, completionPercent, id, children } = quest;
  const isSelected = selectedIndex === id;

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
 
  return (
    <div>
      <div 
        className={cn(baseStyles, colorStyles)}
        onClick={() => setSelectedIndex(id)}
      >
        <div className="flex flex-row items-center gap-2">
          { hasChildren && (
            <div 
              className="rounded-full bg-white/30 h-[22px] w-[22px] flex justify-center items-center cursor-pointer"
              onClick={() => dispatch({ type: "TOGGLE", payload: {id, quest} })}
            >
              {isOpen && (<LuChevronsDown color="black" size="16px"/>)}
              {!isOpen && (<LuChevronRight color="black" size="16px"/>)}
            </div>
          )}
          
          <div>
            <p className="font-medium">{icon} {title}</p>
            <p className={`${isSelected ? "text-zince-400" : "text-gray"} text-xs mt-0.5`}>{typeName} • {completionPercent}</p>
          </div>
          
        </div>
        
      </div>

      {/* Animate children */}
      <AnimatePresence>
        {hasChildren && isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="ml-4 overflow-hidden"
          >
            {children.map(child => (
              <QuestNode
                key={child.id}
                quest={child}
                dispatch={dispatch}
                openState={openState}
                setSelectedIndex={setSelectedIndex}
                selectedIndex={selectedIndex}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
};

export default QuestNode;