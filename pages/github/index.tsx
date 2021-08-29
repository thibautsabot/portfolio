import { DiscussionCommentEdge } from "@octokit/graphql-schema";
import getDiscussions from "./getDiscussions";
import Discussions from "./Discussions";
import Repositories from "./Repositories";
import PullRequests from "./PullRequests";
import Commits from "./Commits";
import StarredRepositories from "./StarredRepositories";

interface Props {
  discussions: DiscussionCommentEdge[];
}

export default function GithubPage({ discussions }: Props) {
  return (
    <div>
      <Discussions discussions={discussions} />
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
