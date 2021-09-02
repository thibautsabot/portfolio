import Commits from "../src/github/components/Commits";
import { DiscussionCommentEdge } from "@octokit/graphql-schema";
import Discussions from "../src/github/components/Discussions";
import Head from "next/head";
import PullRequests from "../src/github/components/PullRequests";
import RecentActivity from "../src/github/components/RecentActivity";
import Repositories from "../src/github/components/Repositories";
import getDiscussions from "../src/github/utils/getDiscussions";
import styles from "./githubpage.module.scss";
interface Props {
  discussions: DiscussionCommentEdge[];
}

export default function GithubPage({ discussions }: Props) {
  return (
    <>
      <Head>
        <title key="title">Github</title>
        <meta name="description" content="Thibautsabot Github Dashboard" />
      </Head>
      <div className={styles.GithubPage}>
        <Discussions discussions={discussions} />
        <RecentActivity />
        <PullRequests />
        <Commits />
        <Repositories />
      </div>
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
