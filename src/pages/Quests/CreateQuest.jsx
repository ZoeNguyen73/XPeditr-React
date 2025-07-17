import { useState } from "react";

import { LuArrowLeftFromLine, LuArrowRightFromLine } from "react-icons/lu";

import NavBar from "../../components/SiteHeader/NavBar";
import QuestExplanationSidebar from "../../components/Quests/QuestExplantionSidebar";
import QuestCreationForm from "../../components/Quests/QuestCreationForm";

import { cn } from "../../utils/ClassName";

const QUEST_TYPES = ["epic", "main", "minor"];

const CreateQuest = () => {
  const [ selectedType, setSelectedType ] = useState(QUEST_TYPES[0]);
  const [ isSidebarVisible, setIsSidebarVisible ] = useState(true);
  return (
    <div className="relative flex flex-col text-text pt-15 lg:px-8 pb-8 px-1 h-screen overflow-y-auto">
      <NavBar containerStyles="absolute top-0 left-0"/>

      <div className="w-full mb-10">
        <p className="font-accent text-5xl text-yellow tracking-wider font-bold">Create New Quest</p>
        <p className="font-sanst text-lg text-text tracking-wider font-medium mt-2">Define your next adventure</p>
      </div>

      <div className="flex flex-row w-full flex-1 gap-5 px-2 md:px-5 lg:px-10 xl:px-20 flex-1">
        <div
          className={cn(
            "relative transition-all duration-300 ease-in-out",
            isSidebarVisible ? "w-3/8 min-w-[380px] opacity-100" : "w-15 min-w-15"
          )}
        >
          <button
            className="absolute top-2 right-[-10px] bg-yellow rounded-r-md px-2 py-1 text-sm font-bold hover:border-2 border-blue z-10 cursor-pointer"
            onClick={() => setIsSidebarVisible((prev) => !prev)}
          >
            { isSidebarVisible && (<LuArrowLeftFromLine color="white" style={{width: 20, height: 20}} />) }
            { !isSidebarVisible && (<LuArrowRightFromLine color="white" style={{width: 20, height: 20}} />) }
          </button>

          {isSidebarVisible && (
            <QuestExplanationSidebar
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          )}

        </div>

        <div className="flex-1 h-full overflow-y-auto">
          <QuestCreationForm />
        </div>
      </div>
    </div>
  )
};

export default CreateQuest;