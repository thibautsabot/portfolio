import { BlockContainer, Content, ContentContainer, Title } from "./Container";

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
  box-shadow: 8px 8px 5px #f9d6a1;
`;

interface Props {
  limit?: number;
}

export default function Commits({ limit = 10 }: Props): ReactElement {
  // use `any` as the octokit types are invalid for events...
  const { data, error } = useSWR<any>("users/thibautsabot/events", fetcher);

  const lastCommits = getUniqCommits(data).slice(0, limit);

  if (error) return <p>An error has occurred.</p>;
  if (!lastCommits) return <p>Loading...</p>;

  return (
    <CommitsContainer>
      <Title>Commits</Title>
      <Content>
        {getUniqCommits(lastCommits).map((commit) => (
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
        ))}
      </Content>
    </CommitsContainer>
  );
}
