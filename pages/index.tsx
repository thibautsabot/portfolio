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
import getDiscussions from "../src/github/utils/getDiscussions";
import styled from "styled-components";

interface Props {
  discussions: DiscussionCommentEdge[];
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

export default function Home({ discussions }: Props): ReactElement {
  return (
    <HomeContainer>
      <Head>
        <title>Thibaut Sabot</title>
        <meta name="description" content="Thibaut Sabot personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Profile />
      <Subtitle>About me</Subtitle>
      <p>
        Hi! I&apos;m a 27 years old french developper currently living in Paris.
        <Logo>
          <Image
            src="/eiffel_tower.png"
            alt="eiffel tower"
            width={24}
            height={40}
            layout="fixed"
          />
        </Logo>
      </p>
      <p>
        I&apos;m a frontend lead developper at Leboncoin.
        <Logo>
          <Image
            src="/lbc_logo.png"
            alt="logo leboncoin"
            width={24}
            height={24}
            layout="fixed"
          />
        </Logo>
      </p>
      <Missions />
      <Subtitle>My recent blog posts</Subtitle>
      <BlogPostsCard />
      <Subtitle>My recent activity</Subtitle>
      <ActivityContainer>
        <Discussions discussions={discussions} />
        <Commits limit={4} />
      </ActivityContainer>
    </HomeContainer>
  );
}

export async function getStaticProps(): Promise<{
  props: { discussions: User["repositoryDiscussionComments"]["edges"] };
  revalidate: number;
}> {
  const discussions = (await getDiscussions())?.slice(0, 4);

  return {
    props: {
      discussions,
    },
    revalidate: 100,
  };
}
