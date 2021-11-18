import styled, { keyframes } from "styled-components";

import { ReactElement } from "react";

const BlockContainer = styled.div`
  width: 95%;
  border-radius: 5px;
  margin-top: 25px;
  margin-left: 10px;

  @media (min-width: 960px) {
    width: 450px;
    margin-left: 25px;
  }
`;

// Credit: https://dev.to/fobabs/how-i-built-a-typical-ubuntu-terminal-using-html-css-1bpj

const Bar = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  align-items: center;
  padding: 0 8px;
  box-sizing: border-box;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background: linear-gradient(#504b45 0%, #3c3b37 100%);
`;

const BarButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BarButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin-right: 5px;
  font-size: 8px;
  height: 12px;
  width: 12px;
  box-sizing: border-box;
  border: none;
  border-radius: 100%;
  background: linear-gradient(#7d7871 0%, #595953 100%);
  text-shadow: 0px 1px 0px rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 1px 0px #41403a, 0px 1px 1px 0px #474642;
`;

const BarButtonExit = styled(BarButton)`
  background: linear-gradient(#f37458 0%, #de4c12 100%);
  background-clip: padding-box;
`;

const BarText = styled.p`
  color: #d5d0ce;
  margin-left: 6px;
  font-size: 14px;
  line-height: 15px;
`;

const Title = ({ children }: { children: string }): ReactElement => {
  return (
    <Bar>
      <BarButtonContainer>
        <BarButtonExit>&#10005;</BarButtonExit>
        <BarButton>&#9472;</BarButton>
        <BarButton>&#9723;</BarButton>
      </BarButtonContainer>
      <BarText>{children}</BarText>
    </Bar>
  );
};

const Content = styled.div`
  padding: 20px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const ContentContainer = styled.a`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`;

const ErrorContainer = styled.p`
  text-align: center;
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  display: inline-block;
  margin: 0 auto;
  width: 80px;
  height: 80px;

  &:after {
    content: " ";
    display: block;
    width: 50px;
    height: 50px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: ${rotate} 1.2s linear infinite;
  }
`;

const Error = (): ReactElement => {
  return <ErrorContainer>An error has occurred.</ErrorContainer>;
};

const Loading = (): ReactElement => {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
};

export { BlockContainer, Title, Content, ContentContainer, Error, Loading };
