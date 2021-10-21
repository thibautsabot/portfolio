import Link from "next/link";
import { ReactElement } from "react";
import getBlogPosts from "../../utils/getBlogPosts";

interface Props {
  posts: string[];
}

export default function Blog({ posts }: Props): ReactElement {
  return (
    <div>
      {posts.map((post, i) => {
        return (
          <div key={i}>
            <Link href={`/blog/${post}`}>{post}</Link>
          </div>
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
