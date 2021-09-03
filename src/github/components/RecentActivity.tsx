import {
  CreateItem,
  ForkItem,
  PublicItem,
  ReleaseItem,
  WatchItem,
} from "./ActivityItems";

import { Endpoints } from "@octokit/types";
import { fetcher } from "../utils/fetcher";
import styles from "./recentactivity.module.scss";
import useSWR from "swr";

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
                return <ForkItem key={event.id} event={event} />;
              case "PublicEvent":
                return <PublicItem key={event.id} event={event} />;
              case "WatchEvent":
                return <WatchItem key={event.id} event={event} />;
              case "CreateEvent":
                return <CreateItem key={event.id} event={event} />;
              case "ReleaseEvent":
                return <ReleaseItem key={event.id} event={event} />;
              default:
                return null;
            }
          })}
      </div>
    </div>
  );
}
