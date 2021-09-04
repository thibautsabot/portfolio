import { useCallback, useState } from "react";

import styled from "styled-components";

const ItemContainer = styled.p`
  width: 80%;
  height: 50px;
  margin: 0;
  padding-left: 5px;
  overflow: hidden;
  color: white;
  display: flex;
  align-items: center;

  @media (min-width: 960px) {
    width: ${(props) => props.containerWidth}px;
    height: 30px;
  }
`;

const ItemWrapper = styled.span`
  width: 80%;
  height: 50px;
  display: flex;
  transition: ${(props) => props.transitionDuration};

  @media (min-width: 960px) {
    width: ${(props) => props.containerWidth}px;
    height: 30px;
  }

  &:hover {
    width: auto;

    transform: ${(props) =>
      props.shouldTranslate ? "translateX(calc(80% - 100%))" : ""};

    @media (min-width: 960px) {
      transform: ${(props) =>
        props.shouldTranslate ? `translateX(calc(${props.containerWidth}px - 100%))` : ""};
    }
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
    <ItemContainer containerWidth={containerWidth}>
      <ItemWrapper
        containerWidth={containerWidth}
        transitionDuration={getTransitionDuration(textRef)}
        shouldTranslate={getShouldTranslate({ textRef, containerWidth })}
      >
        <ItemContent ref={onRefChange}>
          {children}
        </ItemContent>
      </ItemWrapper>
    </ItemContainer>
  );
}
