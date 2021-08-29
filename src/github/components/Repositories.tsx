import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { Endpoints } from "@octokit/types";

type listUserReposResponse =
  Endpoints["GET /users/{username}/repos"]["response"]["data"];

export default function Repositories() {
  const { data, error } = useSWR<listUserReposResponse>(
    "users/thibautsabot/repos",
    fetcher
  );

  if (error) return <p>An error has occurred.</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Repositories</h1>
      {data.map((repository) => (
        <p key={repository.name}>{repository.name}</p>
      ))}
    </div>
  );
}
