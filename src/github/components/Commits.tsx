import {
  BlockContainer,
  Content,
  ContentContainer,
  Error,
  Loading,
  Title,
} from "./Container";

import Link from "next/link";
import MarqueeDescription from "../../components/MarqueeDescription";
import { ReactElement } from "react";
import RepositoryIcon from "./RepositoryIcon";
import { fetcher } from "../utils/fetcher";
import styled from "styled-components";
import useSWR from "swr";

const getCommitMessage = (commit: any): string | undefined =>
  commit?.payload?.commits[0]?.message;
const getCommitHash = (commit: any): string | undefined =>
  commit?.payload?.commits[0]?.sha;

const getUniqCommits = (events: any[] = []): any[] => {
  const commits = events.filter((event) => event?.type === "PushEvent");

  const uniqCommits = commits.reduce((acc, commit) => {
    if (
      !acc.some(
        (elem: any) => getCommitMessage(elem) === getCommitMessage(commit)
      )
    ) {
      // If the current commit is not in the acc yet, push it.
      acc.push(commit);
    }
    return acc;
  }, []);

  return uniqCommits;
};

const CommitsContainer = styled(BlockContainer)`
  box-shadow: 0px 2px 10px 4px #f9d6a1;
`;

interface Props {
  commits?: any[];
}

export default function Commits({ commits }: Props): ReactElement {
  // use `any` as the octokit types are invalid for events...
  const { data, error } = useSWR<any>(!commits?.length ? "users/thibautsabot/events" : null, fetcher);

  const lastCommits = commits?.length ? commits : getUniqCommits(data)

  return (
    <CommitsContainer>
      <Title>Commits</Title>
      <Content>
        {error ? (
          <Error />
        ) : !data && !commits ? (
          <Loading />
        ) : (
          lastCommits.map((commit) => (
            <Link
              passHref
              key={commit?.id}
              href={`https://github.com/${
                commit?.repo?.name
              }/commit/${getCommitHash(commit)}`}
            >
              <ContentContainer>
                <RepositoryIcon
                  name={commit?.repo?.name.replace("thibautsabot/", "")}
                />
                <MarqueeDescription>
                  {getCommitMessage(commit)}
                </MarqueeDescription>
              </ContentContainer>
            </Link>
          ))
        )}
      </Content>
    </CommitsContainer>
  );
}
