import {
  BlockContainer,
  Content,
  ContentContainer,
  Error,
  Loading,
  Title,
} from "./Container";

import { Endpoints } from "@octokit/types";
import Link from "next/link";
import MarqueeDescription from "../../components/MarqueeDescription";
import { ReactElement } from "react";
import RepositoryIcon from "./RepositoryIcon";
import { fetcher } from "../utils/fetcher";
import styled from "styled-components";
import useSWR from "swr";

type listUserReposResponse =
  Endpoints["GET /users/{username}/repos"]["response"]["data"];

const RepositoriesContainer = styled(BlockContainer)`
  box-shadow: 0px 2px 10px 4px #a1f9c8;
`;

export default function Repositories(): ReactElement {
  const { data, error } = useSWR<listUserReposResponse>(
    "users/thibautsabot/repos?sort=pushed&type=public",
    fetcher
  );

  return (
    <RepositoriesContainer>
      <Link passHref href="https://github.com/thibautsabot?tab=repositories">
        <Title>Repositories</Title>
      </Link>
      <Content>
        {error ? (
          <Error />
        ) : !data ? (
          <Loading />
        ) : (
          data.map((repository) => (
            <Link passHref key={repository.id} href={repository.html_url}>
              <ContentContainer>
                <RepositoryIcon name={repository.name} />
                <MarqueeDescription>{repository.name}</MarqueeDescription>
              </ContentContainer>
            </Link>
          ))
        )}
      </Content>
    </RepositoriesContainer>
  );
}
