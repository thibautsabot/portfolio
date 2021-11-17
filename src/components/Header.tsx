import Link from "next/link";
import { ReactElement } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const HeaderContainer = styled.header`
  height: 100px;
  max-width: 1024px;
  margin: 0 auto;
  padding-top: 50px;

  a {
    margin: 0 20px;
  }
`;

const HeaderLinkText = styled.a<{ isCurrentLink: boolean }>`
  text-decoration: ${(props): string =>
    props.isCurrentLink ? "underline" : "none"};
  
  &:hover {
    text-decoration: underline;
  }
`;

const HeaderLink = ({
  href,
  children,
}: {
  href: string;
  children: string;
}): ReactElement => {
  const router = useRouter()
  const isCurrentLink = href === '/' ? href === router.asPath : router.asPath.includes(href)


  return (
    <Link href={href} passHref>
      <HeaderLinkText isCurrentLink={isCurrentLink}>{children}</HeaderLinkText>
    </Link>
  );
};

export default function Header(): ReactElement {
  return (
    <HeaderContainer>
      <HeaderLink href="/">Home</HeaderLink>
      <HeaderLink href="/twitter">Twitter</HeaderLink>
      <HeaderLink href="/github">Github</HeaderLink>
      <HeaderLink href="/blog">Blog</HeaderLink>
    </HeaderContainer>
  );
}
