import Avatar from "./Avatar";
import avatars from "../../constants/avatars";
import { cn } from "../../utils/ClassName";

const AvatarSelector = ({ containerStyles, selectedAvatar="1a", setSelectedAvatar }) => {

  return (
    <div className={cn("flex flex-row flex-wrap", containerStyles)}>
      {Object.keys(avatars).map((avatar) => (
        <div
          onClick={() => setSelectedAvatar(avatar)}
          key={avatar}
          className="cursor-pointer"
        >
          <Avatar 
            avatarName={avatar}
            size="sm"
            border={avatar === selectedAvatar}
            className={avatar === selectedAvatar ? "" : "opacity-50"}
          />
        </div>
        
      ))}
    </div>
  )
};

export default AvatarSelector;