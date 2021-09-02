import { Endpoints } from "@octokit/types"
import Link from "next/link";
import MarqueeDescription from "../../components/MarqueeDescription";
import RepositoryIcon from './RepositoryIcon'
import { fetcher } from "../utils/fetcher";
import styles from "./repository.module.scss";
import useSWR from "swr";

type listUserReposResponse =
  Endpoints["GET /users/{username}/repos"]["response"]["data"];

export default function Repositories() {
  const { data, error } = useSWR<listUserReposResponse>(
    "users/thibautsabot/repos?sort=pushed&type=public",
    fetcher
  );

  if (error) return <p>An error has occurred.</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div className={styles.Repositories}>
      <Link href="https://github.com/thibautsabot?tab=repositories">
        <a className={styles.title}>Repositories</a>
      </Link>
      <div className={styles.content}>
        {data.map((repository) => (
          <Link key={repository.id} href={repository.html_url}>
            <a className={styles.container}>
              <RepositoryIcon name={repository.name} />
              <MarqueeDescription containerWidth={400}>
                {repository.name}
              </MarqueeDescription>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
