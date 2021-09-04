import Link from "next/link";
import MarqueeDescription from "../../components/MarqueeDescription";
import RepositoryIcon from "./RepositoryIcon";
import { fetcher } from "../utils/fetcher";
import { styled } from 'linaria/react'
import useSWR from "swr";

const getCommitMessage = (commit) => commit?.payload?.commits[0]?.message;
const getCommitHash = (commit) => commit?.payload?.commits[0]?.sha;

const getUniqCommits = (events = []) => {
  const commits = events.filter((event) => event.type === "PushEvent");

  const uniqCommits = commits.reduce((acc, commit) => {
    if (
      !acc.some((elem) => getCommitMessage(elem) === getCommitMessage(commit))
    ) {
      // If the current commit is not in the acc yet, push it.
      acc.push(commit);
    }
    return acc;
  }, []);

  return uniqCommits;
};

const CommitsContainer = styled.div`
  width: 430px;
  box-shadow: 8px 8px 5px #f9d6a1;
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

export default function Commits() {
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
            key={commit.id}
            href={`https://github.com/${
              commit.repo.name
            }/commit/${getCommitHash(commit)}`}
          >
            <ContentContainer>
              <RepositoryIcon
                name={commit.repo.name.replace("thibautsabot/", "")}
              />
              <MarqueeDescription containerWidth={400}>
                {getCommitMessage(commit)}
              </MarqueeDescription>
            </ContentContainer>
          </Link>
        ))}
      </Content>
    </CommitsContainer>
  );
}
