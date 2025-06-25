import QuestBox from "./QuestBox";

const QUESTS = [
  {
    title: "Build indie game studio",
    type: "epic",
  },

];

const QuestTree = () => {
  return (
    <div className="relative rounded-xl h-full w-full bg-sidebar p-3 flex flex-col">
      <p className="font-accent text-orange font-medium text-2xl tracking-wider">Active Quests</p>

      <div className="flex flex-col w-full overflow-y-auto flex-1 mt-5">
       <QuestBox quest={QUESTS[0]} />
      </div>
    </div>

  )
};

export default QuestTree;