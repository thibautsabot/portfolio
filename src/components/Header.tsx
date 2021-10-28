import Link from 'next/link'
import { ReactElement } from "react"
import styled from "styled-components";

const HeaderContainer = styled.header`
  height: 100px;
  max-width: 1024px;
  margin: 0 auto;
  padding-top: 50px;

  a {
    margin: 0 20px;
  }
`;

export default function Header(): ReactElement {
  return (
    <HeaderContainer>
      <Link href="/">Home</Link>
      <Link href="/twitter">Twitter</Link>
      <Link href="/github">Github</Link>
      <Link href="/blog">Blog</Link>
    </HeaderContainer>
  )
}