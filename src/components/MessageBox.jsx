import { cn } from "../utils/ClassName";

const typeStyles = {
  success: "bg-bg-green text-green font-sans font-medium tracking-wide",
  error: "bg-bg-red text-red font-sans font-medium tracking-wide",
  warning: "bg-bg-orange text-orange font-sans font-medium tracking-wide",
  normal: "bg-bg-gray text-gray font-sans font-medium tracking-wide",
}

const MessageBox = ({ content, type, containerStyles }) => {
  return (
    <div className={cn(typeStyles[type], containerStyles, "rounded-xl px-5 py-3")}>
      {content}
    </div>
  )
};

export default MessageBox;