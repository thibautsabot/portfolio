import { DiscussionCommentEdge } from "@octokit/graphql-schema";
import getDiscussions from "../src/github/utils/getDiscussions";
import Discussions from "../src/github/components/Discussions";
import Repositories from "../src/github/components/Repositories";
import PullRequests from "../src/github/components/PullRequests";
import Commits from "../src/github/components/Commits";
import RecentActivity from "../src/github/components/RecentActivity";
import styles from "./githubpage.module.css";

interface Props {
  discussions: DiscussionCommentEdge[];
}

export default function GithubPage({ discussions }: Props) {
  return (
    <div className={styles.GithubPage}>
      <Discussions discussions={discussions} />
      <RecentActivity />
      <PullRequests />
      <Commits />
      <Repositories />
    </div>
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
