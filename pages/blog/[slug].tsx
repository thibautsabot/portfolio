import { ReactElement } from "react";
import getBlogPostContent from "../../utils/getBlogPostContent";
import getBlogPosts from "../../utils/getBlogPosts";

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
  const blogPosts = getBlogPosts({});

  return {
    paths: blogPosts.map((post) => ({
      params: { slug: post.replace(".mdx", "") },
    })),
    fallback: false, // Every pages are statically generated a build time.
  };
}
