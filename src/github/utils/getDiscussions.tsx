import { User } from "@octokit/graphql-schema";
import { graphql as gitHubGraphql } from "@octokit/graphql";

export default async function getDiscussions(): Promise<User['repositoryDiscussionComments']['edges']> {
  const graphqlWithAuth = gitHubGraphql.defaults({
    headers: {
      authorization: `bearer ${process.env.GITHUB_TOKEN}`,
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
                  id
                  url
                  discussion {
                    repository {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      `);


  return user.repositoryDiscussionComments.edges;
}
