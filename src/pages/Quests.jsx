import { useState } from "react";

import NavBar from "../components/SiteHeader/NavBar";
import QuestsSideBar from "../components/Quests/QuestsSideBar";
import QuestDetails from "../components/Quests/QuestDetails";

const QUESTS = [
  {
    "id": "epic1",
    "title": "Publish an indie game",
    "type": "epic",
    completionPercent: "35%",
    "children": [
      {
        "id": "main1",
        "title": "Finish first full game",
        "type": "main",
        completionPercent: "80%",
        "children": [
          {
            "id": "minor1",
            "title": "Complete Unity course",
            "type": "minor",
            completionPercent: "100%",
          },
          {
            "id": "minor2",
            "title": "Design characters",
            "type": "minor",
            completionPercent: "60%",
          }
        ]
      },
      {
        "id": "main2",
        "title": "Polish game mechanics",
        "type": "main",
        "children": [],
        completionPercent: "20%",
      },
      {
        "id": "main3",
        "title": "Grow social media presence",
        "type": "main",
        "children": [
          {
            "id": "minor4",
            "title": "Start a Devlog series",
            "type": "minor",
            completionPercent: "100%",
          },
          {
            "id": "minor5",
            "title": "Start a Discord Server",
            "type": "minor",
            completionPercent: "30%",
          }
        ],
        completionPercent: "65%",
      }
    ]
  },
  {
    "id": "epic2",
    "title": "Reach Financial Independence",
    "type": "epic",
    "children": [],
    completionPercent: "0%",
  }
];

const Quests = () => {
  const [selectedIndex, setSelectedIndex] = useState(QUESTS[0].id);

  return (

    <div className="relative flex flex-col text-text pt-15 px-8 pb-8 h-screen">
      <NavBar containerStyles="absolute top-0 left-0"/>

      <div className="flex flex-row justify-center w-full mb-15">
        <p className="font-accent text-5xl text-yellow tracking-wider font-bold">Quests</p>
      </div>

      <div className="flex flex-row w-full flex-1 gap-5 px-8">

        <div className="hidden lg:block min-w-[400px] overflow-hidden">
          <QuestsSideBar quests={QUESTS} setSelectedIndex={setSelectedIndex} selectedIndex={selectedIndex}/>
        </div>

        <div className="flex-4 overflow-hidden">
          <QuestDetails />
        </div>
      </div>
    </div>
    
  )
};

export default Quests;