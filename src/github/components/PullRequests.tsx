import {
  BlockContainer,
  Content,
  ContentContainer,
  Error,
  Loading,
  Title,
} from "./Container";

import { Endpoints } from "@octokit/types";
import Image from "next/image";
import Link from "next/link";
import MarqueeDescription from "../../components/MarqueeDescription";
import { ReactElement } from "react";
import { fetcher } from "../utils/fetcher";
import merged from "../assets/github/merged.png";
import pr from "../assets/github/pr.png";
import styled from "styled-components";
import useSWR from "swr";

type listUserPullRequestsResponse =
  Endpoints["GET /repos/{owner}/{repo}/pulls"]["response"]["data"];

const PullRequestsContainer = styled(BlockContainer)`
  box-shadow: 8px 8px 5px #f9a1a1;
`;

export default function PullRequests(): ReactElement {
  const { data, error } = useSWR<{ items: listUserPullRequestsResponse }>(
    "search/issues?q=is:pr+author:thibautsabot+NOT+Blog&sort=created&per_page=10",
    fetcher
  );

  return (
    <PullRequestsContainer>
      <Link passHref href="https://github.com/thibautsabot?tab=repositories">
        <Title>Pull Requests</Title>
      </Link>
      <Content>
        {error ? (
          <Error />
        ) : !data ? (
          <Loading />
        ) : (
          data.items.map((pullRequest) => (
            <Link passHref key={pullRequest.id} href={pullRequest.html_url}>
              <ContentContainer>
                {pullRequest.state === "closed" ? (
                  <Image
                    layout="fixed"
                    width={24}
                    height={24}
                    src={merged}
                    alt="merged"
                  />
                ) : (
                  <Image
                    layout="fixed"
                    width={24}
                    height={24}
                    src={pr}
                    alt="opened"
                  />
                )}
                <MarqueeDescription>{pullRequest.title}</MarqueeDescription>
              </ContentContainer>
            </Link>
          ))
        )}
      </Content>
    </PullRequestsContainer>
  );
}
