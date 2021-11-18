import { ReactElement, useEffect, useState } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Image from "next/image";
import moon from "../public/moon.webp";
import sun from "../public/sun.png";

const ChangeThemeButton = styled.button`
  background: transparent;
  font-size: 1em;
  cursor: pointer;
  border: none;
  right: 0px;
  position: absolute;
  top: 0px;

  @media (min-width: 960px) {
    top: 20px;
    margin: 1em 0;
    right: 50px;
  }
`;

export const darkTheme = {
  color: "#f8f8f2",
  opposit: "white",
  subColor: "grey",
  background: "#0e0e0e",
  // body: "#353535",
  body: "#0e0e0e",
};

export const lightTheme = {
  color: "black",
  opposit: "black",
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
  padding: 0 20px;
  margin: 0 auto;
  position: relative;
  min-height: calc(100vh - 290px); // 100px from head + 100px from footer + 90px for margins
`;

interface Props {
  children: React.ReactNode;
}

const DEFAULT_THEME = "dark";

export default function Layout({ children }: Props): ReactElement {
  const [appTheme, setAppTheme] = useState(DEFAULT_THEME);
  const toggleTheme = (): void => {
    const theme = appTheme === "light" ? "dark" : "light";
    setAppTheme(theme);
    window.localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    if (window.localStorage.getItem("theme")) {
      setAppTheme(window.localStorage.getItem("theme") || DEFAULT_THEME);
    } else {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setAppTheme("dark");
      } else {
        setAppTheme("light");
      }
    }
  }, []);

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
      <Footer />
    </ThemeProvider>
  );
}
