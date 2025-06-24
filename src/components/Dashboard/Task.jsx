import { LuSquare, LuSquareCheck } from "react-icons/lu";

import { cn } from "../../utils/ClassName";

const Task = ({ task, containerStyles }) => {
  const { title, rewards, is_completed, due_date } = task;
  const baseStyles = "flex flex-col gap-0.5 bg-sidebar w-full px-3 rounded-lg mt-1 mb-1 py-1.5 cursor-pointer hover:bg-hover";

  let borderStyles = "";

  if (due_date) {
    const dueDate = new Date(due_date).getDate();
    const today = new Date().getDate();

    if (dueDate < today) {
      borderStyles = "border-1 border-red-500/30";

    } else if (dueDate === today) {
      borderStyles = "border-1 border-amber-500/30";
    }
  }

  return (
    <div className={cn(baseStyles, containerStyles, borderStyles)}>
      <div className={`flex flex-row gap-2 items-center`}>
        { !is_completed && (<LuSquare style={{width: 16, height: 16}}/>) }
        { is_completed && (<LuSquareCheck style={{width: 16, height: 16}} color="green"/>) }
        <p className={`${is_completed ? "text-green" : "text-text"} font-sans tracking-wide pt-0.5 text-base`}>{title}</p>
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