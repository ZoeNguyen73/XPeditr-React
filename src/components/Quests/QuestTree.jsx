import { useState, useEffect } from "react";

import QuestBox from "./QuestBox";

const QUESTS = [
  {
    title: "Build indie game studio",
    type: "epic",
    completionPercent: "35%",
  },
  {
    title: "Publish first game",
    type: "main",
    completionPercent: "40%",
  },
  {
    title: "Complete prototype",
    type: "minor",
    completionPercent: "80%",
  },
  {
    title: "Learn Unity advanced",
    type: "minor",
    completionPercent: "40%",
  },
  {
    title: "Polish game assets",
    type: "minor",
    completionPercent: "30%",
  },
];

const QuestTree = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="relative rounded-xl h-full w-full bg-sidebar p-3 flex flex-col">
      <p className="font-accent text-orange font-medium text-2xl tracking-wider">Active Quests</p>

      <div className="flex flex-col w-full overflow-y-auto flex-1 mt-5 gap-2 overflow-x-hidden">
        { QUESTS.length > 0 && (
          QUESTS.map((quest, index) => (
            <QuestBox 
              key={index} 
              quest={quest} 
              handlePress={() => setSelectedIndex(index)} 
              isSelected={selectedIndex === index}
              index={index} 
            />
          ))
        )}
      </div>
    </div>

  )
};

export default QuestTree;