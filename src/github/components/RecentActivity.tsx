import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { Endpoints } from "@octokit/types";
import styles from './activity.module.css'
import {
  ForkItem,
  PublicItem,
  WatchItem,
  CreateItem,
  ReleaseItem,
} from "./ActivityItems";

type listUserReposResponse =
  Endpoints["GET /users/{username}/events"]["response"]["data"];

export default function RecentActivity() {
  const { data, error } = useSWR<listUserReposResponse>(
    "users/thibautsabot/events",
    fetcher
  );
  const desiredEvents = [
    "ForkEvent",
    "PublicEvent",
    "WatchEvent",
    "CreateEvent",
    "ReleaseEvent",
    // "PullRequestReviewCommentEvent",
    // "IssueCommentEvent",
    // "CommitCommentEvent",
  ];

  if (error) return <p>An error has occurred.</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div className={styles.RecentActivity}>
      <h1 className={styles.title}>Recent activity</h1>
      <div className={styles.content}>
      {data
        .filter((event) => desiredEvents.includes(event.type))
        .map((event) => {
          switch (event.type) {
            case "ForkEvent":
              return <ForkItem event={event} />;
            case "PublicEvent":
              return <PublicItem event={event} />;
            case "WatchEvent":
              return <WatchItem event={event} />;
            case "CreateEvent":
              return <CreateItem event={event} />;
            case "ReleaseEvent":
              return <ReleaseItem event={event} />;
            default:
              return null;
          }
        })}
    </div>
    </div>
  );
}
