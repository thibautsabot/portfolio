import { Endpoints } from "@octokit/types";
import Link from "next/link";
import MarqueeDescription from "../../components/MarqueeDescription";
import RepositoryIcon from "./RepositoryIcon";
import { fetcher } from "../utils/fetcher";
import styled from "styled-components";
import useSWR from "swr";
import { BlockContainer, Content, ContentContainer, Title } from './Container'

type listUserReposResponse =
  Endpoints["GET /users/{username}/repos"]["response"]["data"];

const RepositoriesContainer = styled(BlockContainer)`
  box-shadow: 8px 8px 5px #a1f9c8;
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
              <MarqueeDescription>
                {repository.name}
              </MarqueeDescription>
            </ContentContainer>
          </Link>
        ))}
      </Content>
    </RepositoriesContainer>
  );
}
