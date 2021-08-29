import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { Endpoints } from "@octokit/types";

type listUserReposResponse =
  Endpoints["GET /users/{username}/events"]["response"]["data"];

export default function RecentActivity() {
  const { data, error } = useSWR<listUserReposResponse>(
    "users/thibautsabot/events",
    fetcher
  );
  const desiredEvents = [
    "FollowEvent",
    "ForkEvent",
    "PublicEvent",
    "WatchEvent",
    // "PullRequestReviewCommentEvent",
    // "IssueCommentEvent",
    // "CommitCommentEvent",
  ];

  if (error) return <p>An error has occurred.</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Recent activity</h1>
      {data
        .filter((event) => desiredEvents.includes(event.type))
        .map((event) => (
          <p key={event.id}>{event.type}</p>
        ))}
    </div>
  );
}
