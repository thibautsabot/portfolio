import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Image from "next/image";
import { useState, ReactElement } from "react";
import moon from "../assets/moon.webp";
import sun from "../assets/sun.png";

const ChangeThemeButton = styled.button`
  color: ${(props): string => props.theme.color};
  background: transparent;
  font-size: 1em;
  margin: 1em 0;
  cursor: pointer;
  display: flex;
  justify-content: end;
  width: 100%;
  border: none;
  padding-right: 50px;
`;

export const darkTheme = {
  color: "white",
  subColor: "grey",
  background: "#151515",
  // body: "#353535",
  body: "black"
};

export const lightTheme = {
  color: "black",
  subColor: "grey",
  background: "#ffcbcb",
  body: "white",
};

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }): string => theme.body};
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
  * {
    box-sizing: border-box;
  }
`;

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props): ReactElement {
  const [appTheme, setAppTheme] = useState("dark");
  const toggleTheme = (): void =>
    setAppTheme(appTheme === "light" ? "dark" : "light");

  return (
    <ThemeProvider theme={appTheme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <ChangeThemeButton onClick={toggleTheme}>
        <Image
          alt="change theme"
          src={appTheme === "light" ? sun : moon}
          layout="fixed"
          width={50}
          height={50}
        />
      </ChangeThemeButton>
      {children}
    </ThemeProvider>
  );
}
