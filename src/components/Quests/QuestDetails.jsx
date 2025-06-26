import { LuPencil } from "react-icons/lu";

import getQuestIconType from "../../utils/GetQuestIconType";

const QuestDetails = ({ quest }) => {
  const { title, type } = quest;
  const { icon, typeName } = getQuestIconType(type);

  const relatedQuestsTitle = type === "epic" 
    ? "🏆 Main Quests"
    : type === "main"
    ? "🎯 Minor Quests"
    : "";

  return (
    <div className="bg-orange-200/15 dark:bg-indigo-900/10 rounded-xl h-full p-10 xl:px-20 text-left overflow-y-auto">
      <div className="flex flex-row gap-2 items-center">
        <p className="text-yellow font-accent font-medium text-5xl tracking-wider"> {icon} {title}</p>
        <div className="bg-gray/20 rounded-full flex flex-col items-center justify-center px-2 lg:px-3 mt-2">
          <p className="text-xs lg:text-base text-text text-center">{typeName}</p>
        </div>
        
        <div 
          className="rounded-full bg-orange-200/80 px-1.5 py-1.5 hover:border-2 border-blue cursor-pointer mt-1"
          // TO DO: add link to quest edit page
          onClick={() => {}}
        >
          <LuPencil color="black" className="w-4 h-4"/>
        </div>
      </div>

      <div className="bg-gray/20 h-[1px] mt-5 mb-5" />

      {/* quest description */}
      <div className="text-base text-text tracking-wide">
        <p>
          Create and launch a complete indie game on the Steam platform. This involves completing the game development, setting up Steam store page, and managing the launch process.
        </p>
      </div>

      {/* progress bar */}
      <div className="mt-8">
        <p className="text-2xl tracking-wider font-bold text-blue">📈 Progress Overview</p>
        <div className="mt-2 relative h-4">
          <div className="absolute z-3 left-0 rounded-full h-3 bg-gradient-to-tr from-purple-500 to-indigo-800" style={{width: "35%"}}></div>
          <div className="absolute z-2 left-0 rounded-full w-full h-3 bg-gray/20"></div>
        </div>
        <div>
          <p className="text-gray text-sm mt-1">35% complete • Started Jan 2025 • Target Jun 2030</p>
        </div>
      </div>

      {/* related Quests */}
      <div className="mt-8">
        <p className="text-2xl tracking-wider font-bold text-blue">🧾 Related Quests</p>
        <div className="dark:bg-bg-blue/40 bg-bg-blue rounded-xl p-3 mt-2">
          <p className="text-lg font-medium text-text tracking-wide">{relatedQuestsTitle} ({quest.children ? quest.children.length : 0} active)</p>

          {/* TO DO: allow user to quick add related quest in this veiw */}
          <div className="border-1 border-gray/80 dark:border-gray/20 border-dotted w-full rounded-xl px-3 py-1 mt-1 mb-1 cursor-pointer hover:bg-gray/15 dark:hover:bg-gray/5">
            <p className="text-base text-gray/80 dark:text-gray/50">+ Add a related <span className="font-medium">{relatedQuestsTitle}</span></p>
          </div>

          { quest.children && quest.children.length > 0 && (
            <div className="mx-3 mt-1">
              {/* TO DO: make the related quests clickable and selected upon click */}
              { quest.children.map(child => (
                <p className="text-base text-text tracking-wide mb-1">
                  • {child.title} ({child.completionPercent})
                </p>
              ))}
            </div>
          )}

        </div>
      </div>
      
      
      {/* recent activity */}
      <div className="mt-8">
        <p className="text-2xl tracking-wider font-bold text-purple">❗️ Recent Activity</p>
        <div className="dark:bg-bg-purple/40 bg-bg-purple rounded-xl p-3 mt-2">
          <p className="text-base mb-1">✅ Completed: "Build basic UI system"</p>
          <p className="text-base mb-1">🔄 In progress: "Add sound effects and music"</p>
        </div>
      </div>
      
    </div>
  )
};

export default QuestDetails;