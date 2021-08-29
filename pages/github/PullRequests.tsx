import useSWR from "swr";
import { fetcher } from "./fetcher";
import { Endpoints } from "@octokit/types";

type listUserPullRequestsResponse =
  Endpoints["GET /repos/{owner}/{repo}/pulls"]["response"]["data"];

export default function PullRequests() {
  const { data, error } = useSWR<{ items: listUserPullRequestsResponse }>(
    "search/issues?q=is:pr+author:thibautsabot+NOT+Blog&sort=created",
    fetcher
  );

  if (error) return <p>An error has occurred.</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Pull requests</h1>
      {data.items.map((pullRequest) => (
        <p key={pullRequest.id}>{pullRequest.title}</p>
      ))}
    </div>
  );
}
