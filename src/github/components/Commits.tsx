import Link from "next/link";
import MarqueeDescription from "../../components/MarqueeDescription";
import RepositoryIcon from "./RepositoryIcon";
import { fetcher } from "../utils/fetcher";
import styled from "styled-components";
import { BlockContainer, Content, ContentContainer, Title } from './Container'
import useSWR from "swr";
import { ReactElement } from 'react'

const getCommitMessage = (commit: any): string | undefined => commit?.payload?.commits[0]?.message;
const getCommitHash = (commit: any): string | undefined => commit?.payload?.commits[0]?.sha;

const getUniqCommits = (events: any[] = []): any[] => {
  const commits = events.filter((event) => event?.type === "PushEvent");

  const uniqCommits = commits.reduce((acc, commit) => {
    if (
      !acc.some((elem: any) => getCommitMessage(elem) === getCommitMessage(commit))
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

export default function Commits(): ReactElement {
  // use `any` as the octokit types are invalid for events...
  const { data, error } = useSWR<any>("users/thibautsabot/events", fetcher);

  if (error) return <p>An error has occurred.</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <CommitsContainer>
      <Title>Commits</Title>
      <Content>
        {getUniqCommits(data).map((commit) => (
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
