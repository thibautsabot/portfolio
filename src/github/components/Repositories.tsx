import { Endpoints } from "@octokit/types";
import Link from "next/link";
import MarqueeDescription from "../../components/MarqueeDescription";
import RepositoryIcon from "./RepositoryIcon";
import { fetcher } from "../utils/fetcher";
import { styled } from 'linaria/react'
import useSWR from "swr";

type listUserReposResponse =
  Endpoints["GET /users/{username}/repos"]["response"]["data"];

const RepositoriesContainer = styled.div`
  width: 430px;
  box-shadow: 8px 8px 5px #a1f9c8;
  border-radius: 5px;
  margin: 25px;
  height: 100%;
`;

const Title = styled.h1`
  font-weight: bold;
  display: block;
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
  background-color: #151515;
  padding: 20px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const ContentContainer = styled.a`
  display: flex;
  align-items: center;
`;

export default function Repositories() {
  const { data, error } = useSWR<listUserReposResponse>(
    "users/thibautsabot/repos?sort=pushed&type=public",
    fetcher
  );

  if (error) return <p>An error has occurred.</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <RepositoriesContainer>
      <Link passHref href="https://github.com/thibautsabot?tab=repositories">
        <Title>Repositories</Title>
      </Link>
      <Content>
        {data.map((repository) => (
          <Link passHref key={repository.id} href={repository.html_url}>
            <ContentContainer>
              <RepositoryIcon name={repository.name} />
              <MarqueeDescription containerWidth={400}>
                {repository.name}
              </MarqueeDescription>
            </ContentContainer>
          </Link>
        ))}
      </Content>
    </RepositoriesContainer>
  );
}
