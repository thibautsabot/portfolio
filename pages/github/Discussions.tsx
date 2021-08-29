import useSWR from "swr";
import { fetcher } from "./fetcher";
import { DiscussionCommentEdge } from "@octokit/graphql-schema";

interface Props {
  discussions: DiscussionCommentEdge[];
}

export default function Discussions({ discussions }: Props) {
  return (
    <div>
      <h1>Discussions</h1>
      {discussions.map((discussion) => (
          <p key={discussion.node.createdAt}>{discussion.node.bodyText}</p>
        ))}
    </div>
  );
}
