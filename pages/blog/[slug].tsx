import getBlogPosts from "../../utils/getBlogPosts";
import getBlogPostContent from "../../utils/getBlogPostContent";
import { ReactElement } from "react";

interface Props {
  content: string;
}

export default function BlogPost({ content }: Props): ReactElement {
  return <div>Hello {content}</div>;
}

export async function getStaticProps({
  params,
}: {
  params: { slug: string };
}): Promise<{ props: { content: string } }> {
  const content = getBlogPostContent(params.slug);

  return {
    props: {
      content,
    },
  };
}

// Statically generate all blog posts
export async function getStaticPaths(): Promise<{
  paths: { params: { slug: string } }[];
  fallback: boolean
}> {
  const blogPosts = getBlogPosts({ limit: 0 });

  return {
    paths: blogPosts.map((post) => ({
      params: { slug: post.replace(".mdx", "") },
    })),
    fallback: false, // Every pages are statically generated a build time.
  };
}
