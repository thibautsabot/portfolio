import { useCallback, useState } from "react";
import useWindowSize from "../../utils/useWindowsSize";
import styled from "styled-components";

const ItemContainer = styled.div`
  height: 50px;
  margin: 0;
  padding-left: 5px;
  overflow: hidden;
  color: ${(props) => props.theme.color};
  display: flex;
  align-items: center;
  transition: 0s;

  @media (min-width: 960px) {
    height: 30px;
  }
`;

const ItemWrapper = styled.span`
  height: 50px;
  display: flex;

  @media (min-width: 960px) {
    height: 30px;
  }

  &:hover {
    // transition: ${(props) => props.transitionDuration} linear;
    transition: 1s linear;
    width: auto;

    transform: ${(props) =>
      props.shouldTranslate ? `translateX(calc(${props.translateWidth}))` : ""};
  }
`;

const ItemContent = styled.span`
  height: 50px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  transform: translateX(0);

  @media (min-width: 960px) {
    height: 30px;
  }
`;

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

function getTranslateWidth(textRef: HTMLElement) {
  return (
    -textRef?.getBoundingClientRect().width -
    5 +
    textRef?.parentElement?.getBoundingClientRect().width +
    "px"
  );
}

function getShouldTranslate(textRef: HTMLElement) {
  return (
    textRef?.getBoundingClientRect().width >
    textRef?.parentElement?.getBoundingClientRect().width
  );
}

interface Props {
  children: React.ReactNode;
}

export default function MarqueeDescription({ children }: Props) {
  const { textRef, onRefChange } = useUpdatedTextRef();
  useWindowSize(); // Update component on resize

  return (
    <ItemContainer>
      <ItemWrapper
        ref={onRefChange}
        translateWidth={getTranslateWidth(textRef)}
        transitionDuration={getTransitionDuration(textRef)}
        shouldTranslate={getShouldTranslate(textRef)}
      >
        <ItemContent>{children}</ItemContent>
      </ItemWrapper>
    </ItemContainer>
  );
}
