import styled from "styled-components";

const BlockContainer = styled.div`
  width: 95%;
  box-shadow: 8px 8px 5px #f9d6a1;
  border-radius: 5px;
  height: 100%;
  margin-top: 25px;
  margin-left: 10px;

  @media (min-width: 960px) {
    width: 430px;
    margin-left: 25px;
  }
`;

const Title = styled.h1`
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
  padding: 20px 10px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const ContentContainer = styled.a`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`;


export { BlockContainer, Title, Content, ContentContainer }