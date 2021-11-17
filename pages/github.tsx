import Commits from "../src/github/components/Commits";
import { DiscussionCommentEdge } from "@octokit/graphql-schema";
import Discussions from "../src/github/components/Discussions";
import Head from "next/head";
import PullRequests from "../src/github/components/PullRequests";
import { ReactElement } from "react";
import RecentActivity from "../src/github/components/RecentActivity";
import Repositories from "../src/github/components/Repositories";
import { User } from "@octokit/graphql-schema";
import getDiscussions from "../src/github/utils/getDiscussions";
import styled from "styled-components";

interface Props {
  discussions: DiscussionCommentEdge[];
}

const Github = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  align-items: center;

  @media (min-width: 960px) {
    > div {
      &:last-child {
        margin-left: calc(60%);
      }
    }
  }
`;

export default function GithubPage({ discussions }: Props): ReactElement {
  return (
    <>
      <Head>
        <title key="title">Github</title>
        <meta name="description" content="Thibautsabot Github Dashboard" />
      </Head>
      <Github>
        <Discussions discussions={discussions} />
        <RecentActivity />
        <PullRequests />
        <Commits />
        <Repositories />
      </Github>
    </>
  );
}

export async function getServerSideProps(): Promise<{
  props: {
    discussions: User["repositoryDiscussionComments"]["edges"];
  };
}> {
  let discussions: User["repositoryDiscussionComments"]["edges"];
  try {
    discussions = await getDiscussions();
  } catch (_: any) {
    discussions = [];
  }

  return {
    props: {
      discussions,
    },
  };
}
