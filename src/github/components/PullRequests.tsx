import { Endpoints } from "@octokit/types";
import Image from "next/image";
import Link from "next/link";
import MarqueeDescription from "../../components/MarqueeDescription";
import { fetcher } from "../utils/fetcher";
import merged from "../assets/github/merged.png";
import pr from "../assets/github/pr.png";
import styles from "./repository.module.scss";
import useSWR from "swr";

type listUserPullRequestsResponse =
  Endpoints["GET /repos/{owner}/{repo}/pulls"]["response"]["data"];

export default function PullRequests() {
  const { data, error } = useSWR<{ items: listUserPullRequestsResponse }>(
    "search/issues?q=is:pr+author:thibautsabot+NOT+Blog&sort=created&per_page=10",
    fetcher
  );

  if (error) return <p>An error has occurred.</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div className={styles.Repositories}>
      <Link href="https://github.com/thibautsabot?tab=repositories">
        <a className={styles.title}>Pull Requests</a>
      </Link>
      <div className={styles.content}>
        {data.items.map((pullRequest) => (
          <Link key={pullRequest.id} href={pullRequest.html_url}>
            <a className={styles.container}>
              {pullRequest.state === "closed" ? (
                <Image width={24} height={24} src={merged} alt="merged" />
              ) : (
                <Image width={24} height={24} src={pr} alt="opened" />
              )}
              <MarqueeDescription containerWidth={400}>
                {pullRequest.title}
              </MarqueeDescription>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
