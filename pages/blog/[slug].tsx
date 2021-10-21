import getBlogPostContent, { BlogContent } from "../../utils/getBlogPostContent";

import { ReactElement } from "react";
import getBlogPosts from "../../utils/getBlogPosts";
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';

interface Props {
  content: BlogContent;
}

export default function BlogPost({ content }: Props): ReactElement {
  const Component = useMemo(
    () => getMDXComponent(content.code),
    [content.code]
  );
  return <div>Hello <Component /></div>;
}

export async function getStaticProps({
  params,
}: {
  params: { slug: string };
}): Promise<{ props: { content: BlogContent } }> {
  const content = await getBlogPostContent(params.slug);

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
