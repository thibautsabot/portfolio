import { BlockContainer, Content, Error, Loading, Title } from "./Container";
import {
  CreateItem,
  ForkItem,
  PublicItem,
  ReleaseItem,
  WatchItem,
} from "./ActivityItems";

import { Endpoints } from "@octokit/types";
import { ReactElement } from "react";
import { fetcher } from "../utils/fetcher";
import styled from "styled-components";
import useSWR from "swr";

type listUserReposResponse =
  Endpoints["GET /users/{username}/events"]["response"]["data"];

const RecentActivityContainer = styled(BlockContainer)`
  box-shadow: 0px 2px 10px 4px #a1b0f9;
`;

export default function RecentActivity(): ReactElement {
  const { data, error } = useSWR<listUserReposResponse>(
    "users/thibautsabot/events?per_page=100",
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

  return (
    <RecentActivityContainer>
      <Title>Recent activity</Title>
      <Content>
        {error ? (
          <Error />
        ) : !data ? (
          <Loading />
        ) : (
          data
            .filter((event) => event.type && desiredEvents.includes(event.type))
            .slice(0, 10)
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
            })
        )}
      </Content>
    </RecentActivityContainer>
  );
}
