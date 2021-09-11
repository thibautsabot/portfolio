import { useEffect, useState } from "react";

function debounce(timeout, func){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

function canUseWindow() {
  return !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );
}

function getSize() {
  if (canUseWindow()) {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  return {
    width: undefined,
    height: undefined,
  };
}

function useWindowSize(delay = 500) {
  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    const updateWindowSize = debounce(delay, (val) => {
      setWindowSize(val);
    });

    const handleResize = () => updateWindowSize(getSize);

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [delay]);
  return windowSize;
}

export default useWindowSize