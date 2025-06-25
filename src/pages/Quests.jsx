import NavBar from "../components/SiteHeader/NavBar";
import QuestTree from "../components/Quests/QuestTree";
import QuestDetails from "../components/Quests/QuestDetails";

const Quests = () => {
  return (

    <div className="relative flex flex-col text-text pt-15 px-8 pb-8 h-screen">
      <NavBar containerStyles="absolute top-0 left-0"/>

      <div className="flex flex-row justify-center w-full mb-15">
        <p className="font-accent text-5xl text-yellow tracking-wider font-bold">Quests</p>
      </div>

      <div className="flex flex-row w-full flex-1 gap-5 px-8">

        <div className="hidden lg:block flex-1 min-w-[280px] overflow-hidden">
          <QuestTree />
        </div>

        <div className="flex-4 overflow-hidden">
          <QuestDetails />
        </div>
      </div>
    </div>
    
  )
};

export default Quests;