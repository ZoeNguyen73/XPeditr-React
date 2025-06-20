import { LuPencil } from "react-icons/lu";

import avatars from "../../constants/avatars";
import { cn } from "../../utils/ClassName";

const sizeStyles = {
  "xs": { dimension: 50, borderRadius: 25 },
  "sm": { dimension: 80, borderRadius: 40 },
  "md": { dimension: 100, borderRadius: 50 },
  "lg": { dimension: 140, borderRadius: 70 }
};

const Avatar = ({ avatarName="1a", size="md", border=true, shadow=false, className, editButton=false }) => {
  const { dimension, borderRadius } = sizeStyles[size];

  return (
    <div className="relative" style={{ width: dimension, height: dimension }}>
      <div 
        className="shadow-xl rounded-full bg-orange-200 z-16 absolute bottom-2 right-2 px-1.5 py-1.5 hover:border-2 border-blue cursor-pointer"
        // TO DO: add link to profile edit page
        onClick={() => {}}
      >
        <LuPencil color="black" className="w-5 h-5"/>
      </div>
      
      <img 
        src={avatars[avatarName]}
        style={{ 
          width: dimension, 
          height: dimension, 
          borderRadius: borderRadius, 
          borderWidth: border ? 2 : 0,
        }}
        className={ cn("border-yellow z-15", className) }
      />
    </div>
  )
};

export default Avatar;