import images from "../../constants/images";

const BossFight = () => {

  return (
    <div className="bg-gradient-to-tr from-red-600/30 to-fuchsia-950/30 rounded-xl w-full p-3">
      <p className="font-sans text-gray font-bold tracking-wide text-sm mb-1">⚔️ Boss Fight 🛡</p>
      <p className="font-sans text-gray tracking-wide text-sm mb-3">Deadline: 1 July 2025</p>
      <div className="bg-gray h-[1px] mx-20"></div>
      <p className="font-medium text-xl font-accent tracking-wider text-orange mt-2">Emberbane, the Infernal Tyrant</p>
      
      <p className="font-sans text-xs text-gray px-3 mt-1">
        Once a forgotten ember at the bottom of a burnout pit, Emberbane now rules over the smoldering remains of abandoned dreams.
      </p>

      <div className="flex flex-row-wrap gap-2 justify-center mt-2">
        <div className="rounded-xl bg-bg-purple px-2 py-1">
          <p className="text-xs font-sans text-purple">+150XP</p>
        </div>

        <div className="rounded-xl bg-bg-orange px-2 py-1">
          <p className="text-xs font-sans text-orange">+250 🪙</p>
        </div>
        
      </div>

      <p className="text-text text-2xl font-accent tracking-wide font-medium mt-3">
        “Another day wasted? Excellent... I grow stronger.”
      </p>
      <div className="h-[200px] flex flex-row justify-center mt-2">
        <img src={images.boss_demon_slime_idle_gif} style={{width: "auto", height: "100%"}}/>
      </div>

      <div className="flex flex-row mx-8 mt-3">
        <p className="text-xs text-gray">HP</p>
        <div className="flex-1"></div>
        <p className="text-xs text-gray">450/1000</p>
      </div>
      <div className="mx-8 relative h-3">
        <div 
          className="absolute z-3 left-0 rounded-full h-3 bg-gradient-to-tr from-rose-700 to-rose-950 border-1 border-rose-950 dark:border-rose-500/30" 
          style={{width: "45%"}}
        />
        <div className="absolute z-2 left-0 rounded-full w-full h-3 border-1 border-rose-950 dark:border-rose-500/30"></div>
      </div>
      <div className="mx-8 mt-2 mb-2">
        <p className="text-gray text-xs tracking-wide">
          Weak to: Daily consistency and momentum
        </p>
        <p className="text-yellow font-bold text-xs tracking-wide">
          (x2 damage from habits completion)
        </p>
      </div>
      
    </div>
  )
};

export default BossFight;