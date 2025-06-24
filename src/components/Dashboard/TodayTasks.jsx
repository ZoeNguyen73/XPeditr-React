import { useEffect, useState } from "react";

import Task from "./Task";

import Button from "../CustomButton/CustomButton";
import { cn } from "../../utils/ClassName";

const TASKS = [
  {
    title: "Clear inbox",
    due_date: "20 Jun 2025",
    is_completed: false,
    rewards: {
      xp: 15,
      coins: 5,
      stats: [{ stat_id: { code: "STR", icon: "💪" }, value: 5 }]
    }
  },
  {
    title: "Water the plants",
    due_date: "20 Jun 2025",
    is_completed: true,
    rewards: {
      xp: 5
    }
  },
  {
    title: "Message Ash from Ronin",
    due_date: "20 Jun 2025",
    is_completed: false,
    rewards: {
      xp: 30,
      coins: 5,
      stats: [{ stat_id: { code: "CHA", icon: "💬" }, value: 8 }]
    }
  },
  {
    title: "30-minute morning workout",
    due_date: "21 Jun 2025",
    is_completed: true,
    rewards: {
      xp: 25,
      stats: [{ stat_id: { code: "STR", icon: "💪" }, value: 6 }]
    }
  },
  {
    title: "Read 10 pages of a book",
    due_date: "22 Jun 2025",
    is_completed: false,
    rewards: {
      xp: 10,
      coins: 3
    }
  },
  {
    title: "Plan weekend trip",
    due_date: "23 Jun 2025",
    is_completed: false,
    rewards: {
      xp: 20,
      coins: 8,
      stats: [{ stat_id: { code: "INT", icon: "🧠" }, value: 4 }]
    }
  },
  {
    title: "Journal for 15 minutes",
    due_date: "23 Jun 2025",
    is_completed: true,
    rewards: {
      xp: 12,
      stats: [{ stat_id: { code: "WIS", icon: "😌" }, value: 5 }]
    }
  },
  {
    title: "Declutter workspace",
    due_date: "24 Jun 2025",
    is_completed: false,
    rewards: {
      xp: 18,
      coins: 4
    }
  },
  {
    title: "Cook a healthy meal",
    due_date: "24 Jun 2025",
    is_completed: false,
    rewards: {
      xp: 22,
      coins: 6,
      stats: [{ stat_id: { code: "VIT", icon: "🔮" }, value: 7 }]
    }
  },
  {
    title: "Call Grandma",
    // due_date: "25 Jun 2025",
    is_completed: false,
    rewards: {
      xp: 10,
      stats: [{ stat_id: { code: "CHA", icon: "💬" }, value: 4 }]
    }
  },
  {
    title: "Clean the bathroom",
    due_date: "26 Jun 2025",
    is_completed: true,
    rewards: {
      xp: 20,
      coins: 5
    }
  },
  {
    title: "Study React for 1 hour",
    due_date: "20 Jun 2025",
    is_completed: false,
    rewards: {
      xp: 35,
      coins: 10,
      stats: [{ stat_id: { code: "INT", icon: "🧠" }, value: 10 }]
    }
  }
];

const TodayTasks = ({ containerStyles }) => {
  const [ tasks, setTasks ] = useState(null);

  const taskCount = TASKS.length;
  let completedTaskCount = 0;

  TASKS.forEach(task => {
    if (task.is_completed) completedTaskCount++;
  });

  useEffect(() => {
    TASKS.sort((a, b) => {
      if (a.due_date) {
        if (b.due_date) {
          const aDueDate = new Date(a.due_date);
          const bDueDate = new Date(b.due_date);
          if (aDueDate < bDueDate) return -1;
          if (aDueDate > bDueDate) return 1;
        } else {
          return -1;
        }
      } else {
        if (b.due_date) return 1;
        return 0;
      }
    })
    // console.log("sorted Tasks: " + JSON.stringify(TASKS));
    setTasks(TASKS);
  }, [TASKS])

  // TO DO: logic to move the completed tasks to the bottom of the list

  return (
    <div className={cn("flex flex-col h-full", containerStyles)}>
      {/* TodayTasks header */}
      <div className="flex items-center mb-2 mt-2 mb-3">
        <p className="text-left font-sans font-medium tracking-wide text-xl text-blue">
          📝 Today's Tasks
        </p>
        
        <div className="flex-1" />
        <Button title="+ Task" size="sm" variant="secondary"/>
        
      </div>

      {/* scrollable tasks list */}
      <div className="flex-1 overflow-y-auto pr-3">
        { tasks && tasks.length > 0 && (
          tasks.map((task, index) => (<Task containerStyles="mt-2 mb-2" task={task} if={index} />))
        )}
      </div>
      
    </div>
  )
};

export default TodayTasks;