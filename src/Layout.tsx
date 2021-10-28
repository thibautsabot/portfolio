import { ReactElement, useState } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

import Header from './components/Header'
import Image from "next/image";
import moon from "../assets/moon.webp";
import sun from "../assets/sun.png";

const ChangeThemeButton = styled.button`
  background: transparent;
  font-size: 1em;
  margin: 1em 0;
  cursor: pointer;
  border: none;
  right: 50px;
  position: absolute;
  top: 20px;
`;

export const darkTheme = {
  color: "#f8f8f2",
  subColor: "grey",
  background: "#151515",
  // body: "#353535",
  body: "#282a36"
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
    color: ${(props): string => props.theme.color};
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

const Main = styled.main`
  max-width: 1024px;
  margin: 0 auto;
`

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
      <Header />
      <ChangeThemeButton onClick={toggleTheme}>
        <Image
          alt="change theme"
          src={appTheme === "light" ? sun : moon}
          layout="fixed"
          width={50}
          height={50}
        />
      </ChangeThemeButton>
      <Main>{children}</Main>
    </ThemeProvider>
  );
}
