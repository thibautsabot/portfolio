import { ReactElement, useEffect, useState } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

import Header from "./components/Header";
import Image from "next/image";
import moon from "../assets/moon.webp";
import sun from "../assets/sun.png";

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
  subColor: "grey",
  background: "#0e0e0e",
  // body: "#353535",
  body: "#0e0e0e",
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
  padding: 0 20px;
  margin: 0 auto;
  position: relative;
  min-height: calc(100vh - 290px); // 100px from head + 100px from footer + 90px for margins
`;

const Footer = styled.footer`
  background: rgba(255, 255, 255, 0.05);
  margin-top: 50px;
  padding: 40px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const FooterLogo = styled.div`
  padding: 0 5px;
`

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
      <Footer>
        Hosted on
        <FooterLogo>
          <a href="https://vercel.com/">
            <Image src="/vercel.svg" alt="Vercel Logo" width={65} height={16} />
          </a>
        </FooterLogo>
        , built with
        <FooterLogo>
          <a href="https://nextjs.org/">
            <Image
              src="/next_logo.png"
              alt="Next.js Logo"
              width={16}
              height={16}
            />
          </a>
        </FooterLogo>
        and available on
        <FooterLogo>
          <a href="https://github.com/thibautsabot/portfolio/">
            <Image
              src="/github_logo.png"
              alt="Github Logo"
              width={16}
              height={16}
            />
          </a>
        </FooterLogo>
        .
      </Footer>
    </ThemeProvider>
  );
}
