import { useState, useReducer } from "react";
import { LuChevronRight, LuChevronsDown } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import QuestNode from "./QuestNode";

// Utility to get all descendant IDs for collapsing
const getAllDescendantIds = (quest) => {
  let ids = [];
  if (quest.children) {
    quest.children.forEach(child => {
      ids.push(child.id);
      ids = ids.concat(getAllDescendantIds(child));
    });
  }
  return ids;
};

// Reducer logic
const reducer = (state, action) => {
  switch (action.type) {

    // checks if the action type === "TOGGLE"
    case "TOGGLE":
      // getting the id and quest info from the action
      const { id, quest } = action.payload; // id: eg "epic1"; quest: the full quest object (with children)
      
      // get the current state of the respective id
      // update it true -> false, or false -> true
      const currentlyOpen = state[id];
      const newState = { ...state, [id]: !currentlyOpen };

      // If collapsing, also collapse all children
      if (currentlyOpen && quest.children) {
        const descendantIds = getAllDescendantIds(quest);
        descendantIds.forEach(childId => {
          newState[childId] = false;
        });
      }
      return newState;
    default:
      return state;
  }
};

const QuestTree = ({ quests, selectedIndex, setSelectedIndex }) => {
  const navigate = useNavigate();

  // Default open state for all quests
  const getInitialState = (quests) => {
    const state = {};
    const recurse = (questList) => {
      questList.forEach(quest => {
        state[quest.id] = true;
        if (quest.children) recurse(quest.children);
      });
    };
    recurse(quests);
    return state;
  };

  const [openState, dispatch] = useReducer(reducer, getInitialState(quests));

  return (
    <div className="relative rounded-xl h-full w-full bg-sidebar p-3 flex flex-col">
      <p className="font-accent text-orange font-medium text-2xl tracking-wider">Active Quests</p>
      <div className="bg-gray/50 h-[1px] mx-20 mt-3" />

      {/* TO DO: allow user to quick add related quest in this veiw */}
      <div 
        className="border-1 border-gray/80 dark:border-gray/20 border-dotted w-full rounded-xl px-3 py-1 mt-4 cursor-pointer hover:bg-gray/15 dark:hover:bg-gray/5"
        onClick={() => navigate("/quests/create")}
      >
        <p className="text-base text-gray/80 dark:text-gray/50">+ Add a <span className="font-medium">Quest</span></p>
      </div>

      <div className="flex flex-col w-full overflow-y-auto flex-1 mt-2 gap-2 overflow-x-hidden">

        { quests.length > 0 && (
          quests.map(quest => (
            <QuestNode
              key={quest.id} 
              quest={quest}
              setSelectedIndex={setSelectedIndex}
              selectedIndex={selectedIndex}
              dispatch={dispatch}
              openState={openState}
            />
          ))
        )}
      </div>
    </div>

  )
};

export default QuestTree;