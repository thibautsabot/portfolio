import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

const getCommitMessage = (commit) => commit?.payload?.commits[0]?.message;

const getUniqCommits = (events = []) => {
  const commits = events.filter((event) => event.type === "PushEvent");

  const uniqCommits = commits.reduce((acc, commit) => {
    if (
      !acc.some((elem) => getCommitMessage(elem) === getCommitMessage(commit))
    ) {
      // If the current commit is not in the acc yet, push it.
      acc.push(commit);
    }
    return acc;
  }, []);

  return uniqCommits;
};

export default function Commits() {
  // use `any` as the octokit types are invalid for events...
  const { data, error } = useSWR<any>("users/thibautsabot/events", fetcher);

  if (error) return <p>An error has occurred.</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Commits</h1>
      {getUniqCommits(data).map((commit) => (
        <p key={commit.id}>{getCommitMessage(commit)}</p>
      ))}
    </div>
  );
}
