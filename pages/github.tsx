import { graphql as gitHubgraphql } from "@octokit/graphql";
import {
  User,
  RepositoryConnection,
  PullRequest,
  DiscussionComment,
} from "@octokit/graphql-schema";

interface GraphqlQuery {
  user: User;
  repositoryDiscussionComments: DiscussionComment;
  repositories: RepositoryConnection;
  pullRequests: PullRequest[];
  starredRepositories: RepositoryConnection;
}

export default function GithubPage({ repositories }: GraphqlQuery) {
  return (
    <div>
      {repositories.nodes.map((repository) => (
        <p key={repository.name}>{repository.name}</p>
      ))}
    </div>
  );
}

// TODO: Use SWR
export async function getServerSideProps() {
  const graphqlWithAuth = gitHubgraphql.defaults({
    headers: {
      authorization: `bearer ${process.env.GITHUB_TOKEN} `,
    },
  });

  const { user } = await graphqlWithAuth<GraphqlQuery>(`
      {
        user(login: "thibautsabot") {
            contributionsCollection {
                commitContributionsByRepository {
                    repository {
                        name
                        isPrivate
                        defaultBranchRef {
                            target {
                                ... on Commit {
                                        history(first: 5) {
                                        totalCount
                                        nodes {
                                            ... on Commit {
                                                committedDate
                                                additions
                                                message
                                                author {
                                                    name
                                                    email
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            repositoryDiscussionComments(first: 10) {
                edges {
                    node {
                    createdAt
                    bodyText
                    upvoteCount
                    isAnswer
                    }
                }
            },
            repositories(first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
                nodes {
                    name
                    description
                }
            },
            pullRequests(first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
                edges {
                    node {
                        id
                        title
                    }
                }
            },
            starredRepositories(first: 10) {
                edges {
                        node {
                        id
                        name
                    }
                }
            }
        }
    }    
      `);

  return {
    props: user,
  };
}
