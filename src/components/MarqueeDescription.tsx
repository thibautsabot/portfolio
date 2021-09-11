import { useCallback, useState } from "react";
import useWindowSize from "../../utils/useWindowsSize";
import styled from "styled-components";
import { ReactElement } from "react";

interface ItemWrapperProps {
  readonly transitionDuration: string;
  readonly shouldTranslate: boolean;
  readonly translateWidth: string;
}

const ItemContainer = styled.div`
  height: 50px;
  margin: 0;
  padding-left: 5px;
  overflow: hidden;
  color: ${(props): string => props.theme.color};
  display: flex;
  align-items: center;
  transition: 0s;

  @media (min-width: 960px) {
    height: 30px;
  }
`;

const ItemWrapper = styled.span<ItemWrapperProps>`
  height: 50px;
  display: flex;

  @media (min-width: 960px) {
    height: 30px;
  }

  &:hover {
    // transition: ${(props): string => props.transitionDuration} linear;
    transition: 1s linear;
    width: auto;

    transform: ${(props): string =>
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
function useUpdatedTextRef(): {
  onRefChange: (node: HTMLElement) => void;
  textRef: HTMLElement | null;
} {
  const [textRef, setTextRef] = useState<HTMLElement | null>(null);

  const onRefChange = useCallback((node: HTMLElement) => {
    setTextRef(node);
  }, []);

  return { onRefChange, textRef };
}

function getTransitionDuration(textRef: HTMLElement | null): string {
  // 180 here seems ok. Fast enough for small scrolls and slow enough for big scrolls
  return textRef ? textRef.getBoundingClientRect().width / 180 + "s" : "0s";
}

function getTranslateWidth(textRef: HTMLElement | null): string {
  if (textRef) {
    return (
      -textRef.getBoundingClientRect().width -
      5 +
      (textRef.parentElement?.getBoundingClientRect().width || 0) +
      "px"
    );
  }

  return "0px";
}

function getShouldTranslate(textRef: HTMLElement | null): boolean {
  if (textRef) {
    return (
      textRef.getBoundingClientRect().width >
      (textRef.parentElement?.getBoundingClientRect().width || 0)
    );
  }

  return false;
}

interface Props {
  children: React.ReactNode;
}

export default function MarqueeDescription({ children }: Props): ReactElement {
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
