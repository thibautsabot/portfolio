import styled, { keyframes } from "styled-components";

import { ReactElement } from "react";

const BlockContainer = styled.div`
  width: 95%;
  box-shadow: 8px 8px 5px #f9d6a1;
  border-radius: 5px;
  margin-top: 25px;
  margin-left: 10px;

  @media (min-width: 960px) {
    width: 430px;
    margin-left: 25px;
  }
`;

const Title = styled.h1`
  color: black;
  font-weight: bold;
  display: block;
  font-size: 12px;
  font-family: monospace;
  margin: 0;
  text-align: center;
  padding: 5px;
  background-color: #dedede;
  margin: 0 auto;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

const Content = styled.div`
  background-color: ${(props): string => props.theme.background};
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
`

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
}

const Loading = (): ReactElement => {
  return <SpinnerContainer><Spinner /></SpinnerContainer>
}

export { BlockContainer, Title, Content, ContentContainer, Error, Loading }
