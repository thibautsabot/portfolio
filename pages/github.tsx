import Commits from "../src/github/components/Commits";
import { DiscussionCommentEdge } from "@octokit/graphql-schema";
import Discussions from "../src/github/components/Discussions";
import Head from "next/head";
import PullRequests from "../src/github/components/PullRequests";
import RecentActivity from "../src/github/components/RecentActivity";
import Repositories from "../src/github/components/Repositories";
import getDiscussions from "../src/github/utils/getDiscussions";
import { styled } from 'linaria/react'
interface Props {
  discussions: DiscussionCommentEdge[];
}

const Github = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
`;

export default function GithubPage({ discussions }: Props) {
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

export async function getServerSideProps() {
  const discussions = await getDiscussions();

  return {
    props: {
      discussions,
    },
  };
}
