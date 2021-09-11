import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

import { useState, ReactElement } from "react";

const ChangeThemeButton = styled.button`
  color: ${(props): string => props.theme.color};
  border: 2px solid ${(props): string => props.theme.color};
  background: ${(props): string => props.theme.background};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  cursor: pointer;
`;

export const darkTheme  = {
  color: "white",
  background: "#151515",
  body: "#353535",
};

export const lightTheme = {
  color: "black",
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

export default function Layout({ children }:Props): ReactElement {
  const [appTheme, setAppTheme] = useState("dark");
  const toggleTheme = (): void =>
    setAppTheme(appTheme === "light" ? "dark" : "light");

  return (
    <ThemeProvider theme={appTheme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <ChangeThemeButton onClick={toggleTheme}>THEME</ChangeThemeButton>
      {children}
    </ThemeProvider>
  );
}
