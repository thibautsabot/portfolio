import BlogPostsCard from "../src/components/BlogPostCard";
import Commits from "../src/github/components/Commits";
import { DiscussionCommentEdge } from "@octokit/graphql-schema";
import Discussions from "../src/github/components/Discussions";
import Head from "next/head";
import Image from "next/image";
import Missions from "../src/components/Missions";
import Profile from "../src/components/Profile";
import { ReactElement } from "react";
import { User } from "@octokit/graphql-schema";
import { fetcher } from "../src/github/utils/fetcher";
import getDiscussions from "../src/github/utils/getDiscussions";
import styled from "styled-components";

interface Props {
  discussions: DiscussionCommentEdge[];
  commits: any
}

const Logo = styled.div`
  margin-left: 10px;
  display: inline-block;
`;

const Subtitle = styled.h3`
  margin: 40px 0 20px 0;
`;

const ActivityContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 960px) {
    flex-direction: row;
  }
`;

const HomeContainer = styled.div`
  a {
    text-decoration: underline;
  }
`

export default function Home({ discussions, commits }: Props): ReactElement {
  return (
    <HomeContainer>
      <Head>
        <title>Thibaut Sabot</title>
        <meta name="description" content="Thibaut Sabot personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Profile />
      <Subtitle>About me</Subtitle>
      <div>
        Hi there! I&apos;m a 27 years old French developer currently living in Paris.
        <Logo>
          <Image
            src="/eiffel_tower.png"
            alt="eiffel tower"
            width={24}
            height={40}
            layout="fixed"
          />
        </Logo>
      </div>
      <div>
        I&apos;m a front end lead developer at Leboncoin.
        <Logo>
          <Image
            src="/lbc_logo.png"
            alt="logo leboncoin"
            width={24}
            height={24}
            layout="fixed"
          />
        </Logo>
      </div>
      <p>I love talking about <strong>performance</strong> and I&apos;m always eager to dig deeper into this field.</p>
      <p>I find it essential to learn from others and share knowledge as much as I can!</p>
      <Missions />
      <Subtitle>My recent blog posts</Subtitle>
      <BlogPostsCard />
      <Subtitle>My recent activity</Subtitle>
      <ActivityContainer>
        <Discussions discussions={discussions} />
        <Commits commits={commits} />
      </ActivityContainer>
    </HomeContainer>
  );
}

export async function getStaticProps(): Promise<{
  props: { discussions: User["repositoryDiscussionComments"]["edges"], commits: any };
  revalidate: number;
}> {
  const discussions = (await getDiscussions())?.slice(0, 4);
  const commits = (await fetcher("users/thibautsabot/events"))?.slice(0, 4);

  return {
    props: {
      discussions,
      commits,
    },
    revalidate: 100,
  };
}
