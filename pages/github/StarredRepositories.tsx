import useSWR from "swr";
import { fetcher } from "./fetcher";
import { Endpoints } from "@octokit/types";

type listUserStarredReposResponse =
  Endpoints["GET /users/{username}/repos"]['response']['data']; // the type "/users/{username}/starred" is incorrect

export default function StarredRepositories() {
  const { data, error } = useSWR<listUserStarredReposResponse>(
    "users/thibautsabot/starred",
    fetcher
  );

  if (error) return <p>An error has occurred.</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Starred Repositories</h1>
      {data.map((repository) => (
        <p key={repository.name}>{repository.name}</p> 
      ))}
    </div>
  );
}
