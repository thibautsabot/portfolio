import Link from "next/link";
import MarqueeDescription from "../../components/MarqueeDescription";
import RepositoryIcon from './RepositoryIcon'
import { fetcher } from "../utils/fetcher";
import styles from "./repository.module.scss";
import useSWR from "swr";

const getCommitMessage = (commit) => commit?.payload?.commits[0]?.message;
const getCommitHash = (commit) => commit?.payload?.commits[0]?.sha;

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
    <div className={styles.Repositories}>
      <h1 className={styles.title}>Commits</h1>
      <div className={styles.content}>
      {getUniqCommits(data).map((commit) => (
        <Link key={commit.id} href={`https://github.com/${commit.repo.name}/commit/${getCommitHash(commit)}`}>
          <a className={styles.container}>
          <RepositoryIcon name={commit.repo.name.replace('thibautsabot/', '')} />
            <MarqueeDescription containerWidth={400}>
              {getCommitMessage(commit)}
            </MarqueeDescription>
          </a>
        </Link>
      ))}
    </div></div>
  );
}
