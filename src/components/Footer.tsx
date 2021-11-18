import { ReactElement, useContext } from "react";
import styled, { ThemeContext } from "styled-components";

import GithubLogo from "../../public/github.svg";
import NextLogo from "../../public/next.svg";
import VercelLogo from "../../public/vercel.svg";

const FooterContainer = styled.footer`
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
`;

export default function Footer(): ReactElement {
  const themeContext = useContext(ThemeContext);

  return (
    <FooterContainer>
      Hosted on
      <FooterLogo>
        <a href="https://vercel.com/">
          <VercelLogo
            title="Vercel"
            alt="Vercel Logo"
            width={16}
            height={16}
            fill={themeContext.opposit}
          />
        </a>
      </FooterLogo>
      , built with
      <FooterLogo>
        <a href="https://nextjs.org/">
          <NextLogo
            title="Next.js"
            alt="Next.js Logo"
            width={16}
            height={16}
            fill={themeContext.opposit}
          />
        </a>
      </FooterLogo>
      and available on
      <FooterLogo>
        <a href="https://github.com/thibautsabot/portfolio/">
          <GithubLogo
            title="Github"
            alt="Github Logo"
            width={16}
            height={16}
            fill={themeContext.opposit}
          />
        </a>
      </FooterLogo>
      .
    </FooterContainer>
  );
}
