import Image from "next/image";
import Like from "./assets/like.svg";
import styled from "styled-components";

export const TweetContainer = styled.div`
  border: 1px solid #1f2937;
  border-radius: 5px;
  width: 90%;
  margin: 0 auto 20px auto;
  padding: 15px;
  position: relative;

  @media (min-width: 960px) {
    max-width: 600px;
  }
`;

export const ProfilePicture = styled.img<{ src: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  src: ${(props): string => props.src};
  margin-right: 20px;
`;

export const Header = styled.a`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: fit-content;
`;

export const NamesContainer = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
`;

export const Name = styled.p`
  color: ${(props): string => props.theme.color};
  margin: 0;
  display: flex;
`;

export const Handle = styled.p`
  color: ${(props): string => props.theme.subColor};
  margin: 0;
`;

export const Text = styled.p`
  color: ${(props): string => props.theme.color};
  margin: 0;
`;

export const Footer = styled.p`
  color: ${(props): string => props.theme.subColor};
`;

export const Intents = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Intent = styled.a<{ hoverColor: string }>`
  display: flex;
  align-items: center;
  color: ${(props): string => props.theme.subColor};

  :hover {
    color: ${(props): string => props.hoverColor};

    svg {
      fill: ${(props): string => props.hoverColor};
    }
  }
`;

export const TwitterIconContainer = styled.a`
  position: absolute;
  right: 10px;
  top: 15px;
  height: 50px;
  width: 50px;
`;

export const AnimatedTwitterIcon = styled.div`
  position: absolute;
  opacity: 0;

  ${TwitterIconContainer}:hover & {
    opacity: 1;
  }
`;

export const TwitterIcon = styled.div`
  position: absolute;

  ${TwitterIconContainer}:hover & {
    opacity: 0;
  }
`;
