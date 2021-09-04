import { Endpoints } from "@octokit/types";
import Image from "next/image";
import Link from "next/link";
import MarqueeDescription from "../../components/MarqueeDescription";
import { fetcher } from "../utils/fetcher";
import merged from "../assets/github/merged.png";
import pr from "../assets/github/pr.png";
import styled from "styled-components";
import useSWR from "swr";

type listUserPullRequestsResponse =
  Endpoints["GET /repos/{owner}/{repo}/pulls"]["response"]["data"];

const PullRequestsContainer = styled.div`
  width: 430px;
  box-shadow: 8px 8px 5px #f9a1a1;
  border-radius: 5px;
  height: 100%;
  margin-top: 25px;
  margin-left: 25px;
`;

const Title = styled.h1`
  font-weight: bold;
  display: block;
  font-size: 12px;
  font-family: monospace;
  text-align: center;
  padding: 5px;
  background-color: #dedede;
  margin: 0 auto;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

const Content = styled.div`
  background-color: #151515;
  padding: 20px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const ContentContainer = styled.a`
  display: flex;
  align-items: center;
`;

export default function PullRequests() {
  const { data, error } = useSWR<{ items: listUserPullRequestsResponse }>(
    "search/issues?q=is:pr+author:thibautsabot+NOT+Blog&sort=created&per_page=10",
    fetcher
  );

  if (error) return <p>An error has occurred.</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <PullRequestsContainer>
      <Link passHref href="https://github.com/thibautsabot?tab=repositories">
        <Title>Pull Requests</Title>
      </Link>
      <Content>
        {data.items.map((pullRequest) => (
          <Link passHref key={pullRequest.id} href={pullRequest.html_url}>
            <ContentContainer>
              {pullRequest.state === "closed" ? (
                <Image width={24} height={24} src={merged} alt="merged" />
              ) : (
                <Image width={24} height={24} src={pr} alt="opened" />
              )}
              <MarqueeDescription containerWidth={400}>
                {pullRequest.title}
              </MarqueeDescription>
            </ContentContainer>
          </Link>
        ))}
      </Content>
    </PullRequestsContainer>
  );
}
