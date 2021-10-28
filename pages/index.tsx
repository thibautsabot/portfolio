import { DiscussionCommentEdge } from "@octokit/graphql-schema";
import Head from "next/head";
import Image from "next/image";
import { ReactElement } from "react";
import { User } from "@octokit/graphql-schema";
import getDiscussions from "../src/github/utils/getDiscussions";

interface Props {
  discussions: DiscussionCommentEdge[];
}

export default function Home({ discussions }: Props): ReactElement {
  return (
    <div>
      <Head>
        <title>Thibaut Sabot</title>
        <meta name="description" content="Thibaut Sabot personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to my personal website</h1>

        {discussions.map(({ node }) => (
          <p key={node?.createdAt}>{node?.bodyText}</p>
        ))}
      </main>

      <footer>
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          Powered by{" "}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps(): Promise<{
  props: { discussions: User["repositoryDiscussionComments"]["edges"] };
  revalidate: number;
}> {
  const discussions = await getDiscussions();

  return {
    props: {
      discussions,
    },
    revalidate: 100,
  };
}
