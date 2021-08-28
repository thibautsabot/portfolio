import Head from "next/head";
import Image from "next/image";
import { graphql as gitHubgraphql } from "@octokit/graphql";
import { User } from "@octokit/graphql-schema";

export default function Home({ discussions }) {
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
          <p key={node.createdAt}>{node.bodyText}</p>
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

export async function getStaticProps() {
  const graphqlWithAuth = gitHubgraphql.defaults({
    headers: {
      authorization: `bearer ${process.env.GITHUB_TOKEN} `,
    },
  });

  const { user } = await graphqlWithAuth<{ user: User }>(`
    {
      user(login: "thibautsabot") {
        repositoryDiscussionComments(first: 10) {
          edges {
            node {
              createdAt
              bodyText
              upvoteCount
              isAnswer
            }
          }
        }
      }
    }
  `);

  return {
    props: {
      discussions: user.repositoryDiscussionComments.edges,
    },
    revalidate: 100,
  };
}
