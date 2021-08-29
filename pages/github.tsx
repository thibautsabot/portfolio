import { DiscussionCommentEdge } from "@octokit/graphql-schema";
import getDiscussions from "../src/github/utils/getDiscussions";
import Discussions from "../src/github/components/Discussions";
import Repositories from "../src/github/components/Repositories";
import PullRequests from "../src/github/components/PullRequests";
import Commits from "../src/github/components/Commits";
import StarredRepositories from "../src/github/components/StarredRepositories";
import RecentActivity from "../src/github/components/RecentActivity";

interface Props {
  discussions: DiscussionCommentEdge[];
}

export default function GithubPage({ discussions }: Props) {
  return (
    <div>
      <Discussions discussions={discussions} />
      <RecentActivity />
      <Repositories />
      <PullRequests />
      <Commits />
      <StarredRepositories />
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
