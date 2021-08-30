import styles from "./marquee.module.css";
import { useCallback, useState } from "react";

// Make sure our ref is valid
function useUpdatedTextRef() {
  const [textRef, setTextRef] = useState<HTMLElement>(null);

  const onRefChange = useCallback((node: HTMLElement) => {
    setTextRef(node);
  }, []);

  return { onRefChange, textRef };
}

function getTransitionDuration(textRef: HTMLElement) {
  // 180 here seems ok. Fast enough for small scrolls and slow enough for big scrolls
  return textRef?.getBoundingClientRect().width / 180 + "s";
}

function getShouldTranslate({
  textRef,
  containerWidth,
}: {
  textRef: HTMLElement;
  containerWidth: number;
}) {
  return textRef?.getBoundingClientRect().width > containerWidth;
}

interface Props {
  children: React.ReactNode;
  containerWidth: number;
}

export default function MarqueeDescription({
  children,
  containerWidth,
}: Props) {
  const { textRef, onRefChange } = useUpdatedTextRef();

  return (
    <p className={styles.itemText}>
      <span
        className={
          getShouldTranslate({ textRef, containerWidth })
            ? styles.shouldTranslate
            : ""
        }
        style={{ transition: getTransitionDuration(textRef) }}
      >
        <span ref={onRefChange}>{children}</span>
      </span>
    </p>
  );
}
