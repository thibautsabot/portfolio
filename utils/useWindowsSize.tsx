import { useEffect, useState } from "react";

function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number
): (...args: Params) => void {
  let timer: NodeJS.Timeout;
  return (...args: Params): void => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

const canUseWindow = (): boolean => {
  return !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );
};

const getSize = (): WindowSize => {
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
};

interface WindowSize {
  width?: number;
  height?: number;
}

const useWindowSize = (delay = 500): WindowSize => {
  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    const updateWindowSize = debounce((val: WindowSize) => {
      setWindowSize(val);
    }, delay);

    const handleResize = (): void => updateWindowSize(getSize());

    window.addEventListener("resize", handleResize);
    handleResize();
    return (): void => window.removeEventListener("resize", handleResize);
  }, [delay]);

  return windowSize;
};

export default useWindowSize;
