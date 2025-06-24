import { useState, useEffect } from "react";

import getFormattedDate from "../../utils/DateWithTimeZone";

import Quote from "./Quote";
import TodayTasks from "./TodayTasks";
import TodayHabits from "./TodayHabits";

const MainContent = ({ containerStyles }) => {
  const date = getFormattedDate();

  return (
    <div className={`flex flex-col h-full items-center`}>

      {/* MainContent header */}
      <p className="text-5xl font-accent font-bold text-yellow tracking-wider z-2">
        Adventure Journal
      </p>
      {date && (
        <p className="text-sm text-text tracking-wide mt-1">{date}</p>
      )}
      <Quote containerStyles="mt-3"/>

      {/* divider */}
      <div className="h-[1px] bg-gray w-1/2 mt-7 mb-3"></div>

      {/* MainContent content*/}
      <div className="flex flex-row-nowrap w-11/12 gap-15 flex-1 overflow-hidden">
        <TodayTasks containerStyles="mt-3 flex-1"/>
        <TodayHabits containerStyles="mt-3 flex flex-col items-start flex-1"/>
      </div>
      
    </div>
  )
};

export default MainContent