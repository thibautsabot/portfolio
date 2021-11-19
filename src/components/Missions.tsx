import Link from "next/link";
import { ReactElement } from 'react'
import styled from "styled-components";

const MissionsList = styled.ul`
  line-height: 25px;
`;

export default function Missions(): ReactElement {
  return (
    <>
      <p>My main missions are: </p>
      <MissionsList>
        <li>
          Guaranteeing good practices (tests, syntax, algorithm complexity,
          design pattern)
        </li>
        <li>
          Assisting others on subjects where expertise is needed (debug,
          technical choices, ...)
        </li>
        <li>
          Advising and suggesting on the company&apos;s technical strategies
        </li>
        <li>Advocating for the technical choices of the Web developers</li>
        <li>
          Leading chapter meetings and workshops to make sure developers can learn from each others
        </li>
        <li>
          Constantly checking the health of our technical stack (Performance,
          usage of our design system, metrics, migrations, ...)
        </li>
      </MissionsList>
      <p>
        In my spare time I like to contribute to Next.js by{" "}
        <a href="https://github.com/vercel/next.js/discussions/">answering discussions</a> or creating{" "}
        <a href="https://github.com/vercel/next.js/pulls?q=author%3Athibautsabot">
          pull requests
        </a>
        .
      </p>
    </>
  );
}
