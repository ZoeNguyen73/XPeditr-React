import QuestTree from "./QuestTree";

const QuestsSideBar = ({ quests, selectedIndex, setSelectedIndex}) => {

  return (
    <div className="relative rounded-xl h-full w-full bg-sidebar p-3 flex flex-col">
      <QuestTree quests={quests} setSelectedIndex={setSelectedIndex} selectedIndex={selectedIndex} />
    
    </div>

  )
};

export default QuestsSideBar;