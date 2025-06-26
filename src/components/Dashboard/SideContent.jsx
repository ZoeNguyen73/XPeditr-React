import Button from "../CustomButton/CustomButton";
import BossFight from "./BossFight";

const SideContent = () => {
  return (
    <div className={`flex flex-col h-full items-center p-7`}>
      <p className="text-3xl font-accent font-bold text-orange tracking-wider z-2">
        Ongoing Quests
      </p>

      {/* Main Epic Quest progress */}
      <div className="w-full bg-gradient-to-tr from-yellow-400/30 to-purple-800/30 rounded-xl mt-5 mb-5 p-3 relative">
        <div className="absolute right-1 top-1">
          <p className="text-2xl">📌</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray tracking-wide mb-2">🌟 Epic Quest: <span className="font-bold text-red">Publish an indie game</span> 🌟</p>
          <div className="bg-gray h-[1px] mx-20" />
          <p className="mt-2 text-base tracking-wide text-gray">Current Major Quest:</p>
          <p className="text-3xl font-accent text-orange font-medium tracking-wider">Finish first full game</p>
          <div className="mx-8 w-5/6 mt-3 relative h-3">
            <div className="absolute z-3 left-0 rounded-full h-3 bg-gradient-to-tr from-emerald-600 to-cyan-800" style={{width: "65%"}}></div>
            <div className="absolute z-2 left-0 rounded-full w-full h-3 bg-gray/40 dark:bg-gray/20"></div>
          </div>
          <p className="text-xs text-gray mt-3">25 tasks completed - 10 to go!</p>
          <Button 
            title="View Tasks"
            size="xs"
            containerStyles="mt-3"
            variant="tertiary"
          />
        </div>
      </div>
      <BossFight />

    </div>
  )
};

export default SideContent;