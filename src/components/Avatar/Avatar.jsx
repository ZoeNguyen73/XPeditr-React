import avatars from "../../constants/avatars";
import { cn } from "../../utils/ClassName";

const sizeStyles = {
  "xs": { dimension: 50, borderRadius: 25 },
  "sm": { dimension: 80, borderRadius: 40 },
  "md": { dimension: 100, borderRadius: 50 },
  "lg": { dimension: 140, borderRadius: 70 }
};

const Avatar = ({ avatarName="1a", size="md", border=true, shadow=false, className }) => {
  const { dimension, borderRadius } = sizeStyles[size];

  return (
    <div style={{ width: dimension, height: dimension }}>
      <img 
        src={avatars[avatarName]}
        style={{ 
          width: dimension, 
          height: dimension, 
          borderRadius: borderRadius, 
          borderWidth: border ? 2 : 0,
        }}
        className={ cn("border-yellow", className) }
      />
    </div>
  )
};

export default Avatar;