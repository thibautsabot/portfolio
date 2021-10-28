import Link from "next/link";
import { ReactElement } from "react";
import getBlogPosts from "../../utils/getBlogPosts";
import styled from "styled-components";
interface Props {
  posts: string[];
}

export const BlogPost = styled.div`
  margin: 20px 0;

  &:hover {
    text-decoration: underline;
  }
`;

export default function Blog({ posts }: Props): ReactElement {
  return (
    <div>
      {posts.map((post, i) => {
        return (
          <BlogPost key={i}>
            <Link href={`/blog/${post}`}>{post}</Link>
          </BlogPost>
        );
      })}
    </div>
  );
}

// Get the 5 first post
export async function getStaticProps(): Promise<{
  props: {
    posts: string[];
  };
}> {
  const posts = getBlogPosts({ limit: 5 });

  return {
    props: {
      posts,
    },
  };
}
