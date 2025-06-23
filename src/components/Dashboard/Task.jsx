import { LuSquare, LuSquareCheck } from "react-icons/lu";

import { cn } from "../../utils/ClassName";

const Task = ({ task, containerStyles }) => {
  const { title, rewards, is_completed, due_date } = task;
  const baseStyles = "flex flex-col gap-2 bg-sidebar w-full px-3 rounded-lg mt-1 mb-1 py-2 cursor-pointer hover:bg-hover";
  
  // TO DO: interactions
  // click on the task anywhere but the check box: open the task in pop up
  // click on the check box: complete the task

  return (
    <div className={cn(baseStyles, containerStyles)}>
      <div className={`flex flex-row gap-2 items-center`}>
        { !is_completed && (<LuSquare style={{width: 20, height: 20}}/>) }
        { is_completed && (<LuSquareCheck style={{width: 20, height: 20}} color="green"/>) }
        <p className={`${is_completed ? "text-green" : "text-text"} font-sans tracking-wide pt-1`}>{title}</p>
        <div className="flex-1"></div>
        {due_date && (
          <p className="text-xs text-gray">Due: {due_date}</p>
        )}
      </div>

      <div className="flex flex-row-wrap gap-2">
        { rewards.xp && (
          <div className="rounded-xl bg-bg-purple px-2 py-1">
            <p className="text-xs font-sans text-purple">+{rewards.xp} XP</p>
          </div>
        )}

        { rewards.coins && (
          <div className="rounded-xl bg-bg-orange px-2 py-1">
            <p className="text-xs font-sans text-orange">+{rewards.coins} 🪙</p>
          </div>
        )}

        { rewards.stats && (
          <div className="rounded-xl bg-bg-gray px-2 py-1">
            <p className="text-xs font-sans text-gray">+{rewards.stats[0].value} {rewards.stats[0].stat_id.icon}</p>
          </div>
        )}
        
      </div>
    </div>
    
  )
};

export default Task;