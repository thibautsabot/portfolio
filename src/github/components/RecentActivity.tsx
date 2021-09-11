import {
  CreateItem,
  ForkItem,
  PublicItem,
  ReleaseItem,
  WatchItem,
} from "./ActivityItems";

import { Endpoints } from "@octokit/types";
import { fetcher } from "../utils/fetcher";
import styled from "styled-components";
import useSWR from "swr";

type listUserReposResponse =
  Endpoints["GET /users/{username}/events"]["response"]["data"];

const RecentActivityContainer = styled.div`
  width: 430px;
  box-shadow: 8px 8px 5px #a1b0f9;
  border-radius: 5px;
  height: 100%;
  margin-top: 25px;
  margin-left: 25px;
`;

const Title = styled.h1`
  font-size: 12px;
  font-family: monospace;
  margin: 0;
  text-align: center;
  padding: 5px;
  background-color: #dedede;
  margin: 0 auto;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

const Content = styled.div`
  background-color: ${(props) => props.theme.background};
  padding: 20px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

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
    <RecentActivityContainer>
      <Title>Recent activity</Title>
      <Content>
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
      </Content>
    </RecentActivityContainer>
  );
}
