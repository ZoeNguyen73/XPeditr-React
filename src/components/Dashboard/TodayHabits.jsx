import Task from "./Task";

const HABITS = [
  {
    title: "30-min exercise",
    target: "3 times/week",
    is_completed: false,
    rewards: {
      xp: 15,
      coins: 5,
      stats: [ {stat_id: { code: "STR", icon: "💪"}, value: 5}]
    }
  },
  {
    title: "Drink 2l water",
    target: "1 time/day",
    is_completed: true,
    rewards: {
      xp: 5,
    }
  }
];

const TodayHabits = ({ containerStyles }) => {
  return (
    <div className={containerStyles}>
      <p className="text-left font-sans font-medium tracking-wide text-xl text-blue mb-3 mt-2">
        🔁 Today's Habits
      </p>
      <Task containerStyles="ml-1" task={HABITS[0]} />
      <Task containerStyles="ml-1" task={HABITS[1]} />
      {/* <Task containerStyles="ml-1"/> */}
    </div>
  )
};

export default TodayHabits;