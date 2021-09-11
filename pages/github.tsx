import Commits from "../src/github/components/Commits";
import { DiscussionCommentEdge } from "@octokit/graphql-schema";
import Discussions from "../src/github/components/Discussions";
import Head from "next/head";
import Layout from "../src/Layout";
import PullRequests from "../src/github/components/PullRequests";
import RecentActivity from "../src/github/components/RecentActivity";
import Repositories from "../src/github/components/Repositories";
import getDiscussions from "../src/github/utils/getDiscussions";
import styled from "styled-components";
import { ReactElement } from "react";
import { User } from "@octokit/graphql-schema";

interface Props {
  discussions: DiscussionCommentEdge[];
}

const Github = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
`;

export default function GithubPage({ discussions }: Props): ReactElement {
  return (
    <Layout>
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
    </Layout>
  );
}

export async function getServerSideProps(): Promise<{
  props: {
    discussions: User["repositoryDiscussionComments"]["edges"];
  };
}> {
  const discussions = await getDiscussions();

  return {
    props: {
      discussions,
    },
  };
}
