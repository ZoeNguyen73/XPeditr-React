import { useEffect, useRef } from "react";

const useOneTimeEffect = (callback, deps = []) => {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      callback();
      hasRun.current = true;
    }
    
  }, deps);
};

export default useOneTimeEffect;