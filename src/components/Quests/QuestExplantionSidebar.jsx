import { LuArrowBigDownDash } from "react-icons/lu";

import { cn } from "../../utils/ClassName";

const QuestExplanationSidebar = () => {
  const baseStyles = "mb-1 rounded-xl p-2 pr-4 text-left tracking-wide flex flex-row gap-2 w-full items-center";
  const epicQuestStyles = "border-l-2 border-red bg-red/10";
  const mainQuestStyles = "border-l-2 border-yellow bg-yellow/10";
  const minorQuestStyles = "border-l-2 border-blue bg-blue/10";
  const exampleStyles = "mb-1 rounded-xl p-2 text-left tracking-wide bg-gray/10 flex flex-col justify-center text-gray text-sm px-4 leading-relaxed";
  
  return (
    <div className="relative rounded-xl h-full w-full bg-sidebar py-5 px-8 flex flex-col">
      <p className="font-accent text-blue font-medium text-3xl tracking-wider">🧭 Understanding Quest Types</p>
      <div className="bg-gray/50 h-[1px] mx-20 mt-3" />

      <div className="flex flex-col gap-2 mt-5">

        <div className="relative flex flex-row gap-3">
          <div className={cn(baseStyles, epicQuestStyles)}>
            <div>
              <p className="text-5xl">🏰</p>
            </div>
            <div className="flex flex-col gap-1 w-2/5">
              <p className="font-accent font-medium text-3xl text-red tracking-wider">Epic Quest</p>
              <p className="text-text text-sm">• Your ultimate life aspiration</p>
              <p className="text-text text-sm">• May take 5+ years/lifelong</p>
            </div>
            <div className={cn("flex-1", exampleStyles)}>
              <p>✈️ Travel to 30 countries</p>
              <p>🐱 Build a cat sanctuary</p>
              <p>🖋 Become a Published Novelist</p>
              <p>🏋️‍♀️ Compete in a triathlon</p>
            </div>
          </div>

          <div className="absolute -bottom-6 left-2">
            <LuArrowBigDownDash style={{width: 50, height: 50, color: "#d7d0d6"}}/>
          </div>
          
        </div>

        <div className="relative flex flex-row gap-3">
          <div className={cn(baseStyles, mainQuestStyles)}>
            <div>
              <p className="text-5xl">🏆</p>
            </div>
            <div className="flex flex-col gap-1 w-2/5">
              <p className="font-accent font-medium text-3xl tracking-wider text-orange">Main Quest</p>
              <p className="text-text text-sm">• Large milestones supporting your Epic Quest</p>
              <p className="text-text text-sm">• May take 6 months - few years</p>
            </div>
            <div className={cn("flex-1", exampleStyles)}>
              <p>✈️ Save $10,000 for travel</p>
              <p>🐱 Find a partner/investor</p>
              <p>🖋 Finish a writing course</p>
              <p>🏋️‍♀️ Complete a half marathon</p>
            </div>
          </div>

          <div className="absolute -bottom-6 left-2">
            <LuArrowBigDownDash style={{width: 50, height: 50, color: "#d7d0d6"}}/>
          </div>
          
        </div>

        <div className="flex flex-row gap-3">
          <div className={cn(baseStyles, minorQuestStyles)}>
            <div>
              <p className="text-5xl">🎯</p>
            </div>
            <div className="flex flex-col gap-1 w-2/5">
              <p className="font-accent font-medium text-3xl tracking-wider text-blue">Minor Quest</p>
              <p className="text-text text-sm">• Short-to-mid-term projects that support the Main/Epic Quest</p>
              <p className="text-text text-sm">• May take 1 day - a few months</p>
            </div>
            <div className={cn("flex-1", exampleStyles)}>
              <p>✈️ Research attractions in Italy</p>
              <p>🐱 Join local animal welfare group</p>
              <p>🖋 Complete NaNoWriMo 2025</p>
              <p>🏋️‍♀️ Start strength training level 1</p>
            </div>
          </div>
          
        </div>

      </div>

      <div className="rounded-xl border-dashed border-1 border-gray/50 mt-5 p-3 px-5 text-left text-sm leading-relaxed">
        <p className="font-accent font-medium tracking-wider text-2xl text-yellow">Important tips!</p>
        <div className="flex flex-row gap-1 tracking-wide">
          <p>•</p>
          <p>The above framework serves as a general guidelines to help you plan out your gameplan! Epic Quests may be intimidating without actionable smaller quests.</p>
        </div>
        <div className="flex flex-row gap-1 tracking-wide mt-1">
          <p>•</p>
          <p>You can create standalone quests with no related parent/child quests to support any "side quests" you have in life.</p>
        </div>
        <div className="flex flex-row gap-1 tracking-wide mt-1">
          <p>•</p>
          <p>Under Minor Quest (or any other quest type), you can then create supporting <span className="font-medium text-yellow">Tasks</span> and/or <span className="font-medium text-yellow">Habits.</span></p>
        </div>
        <div className="flex flex-row gap-1 tracking-wide mt-1">
          <p>•</p>
          <p>Just like how plans may change in real life, you can always adjust your Quests, add/remove child quests, move things around, etc... as long as the quest has not been compledte yet!</p>
        </div>
        
      </div>
    </div>
  )
};

export default QuestExplanationSidebar;