import NextImage, { ImageProps } from "next/image";
import getBlogPostContent, {
  BlogContent,
} from "../../utils/getBlogPostContent";

import { ReactElement } from "react";
import getBlogPosts from "../../utils/getBlogPosts";
import { getMDXComponent } from "mdx-bundler/client";
import styled from "styled-components";
import { useMemo } from "react";

interface Props {
  content: BlogContent;
}

const Paragraph = styled.p`
  color: ${(props): string => props.theme.color};
`;

const Title = styled.h1`
  color: red;
`;

const SubTitle = styled.h2`
  color: ${(props): string => props.theme.color};
`;

const Image = (props: ImageProps): ReactElement => {
  return <NextImage {...props} />;
};

const BlogLayout = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

export default function BlogPost({ content }: Props): ReactElement {
  const Component = useMemo(
    () => getMDXComponent(content.code),
    [content.code]
  );
  return (
    <BlogLayout>
      <Component
        components={{
          p: Paragraph,
          h1: Title,
          h2: SubTitle,
          Image: Image as any,
        }}
      />
    </BlogLayout>
  );
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
  fallback: boolean;
}> {
  const blogPosts = getBlogPosts({});

  return {
    paths: blogPosts.map((post) => ({
      params: { slug: post.replace(".mdx", "") },
    })),
    fallback: false, // Every pages are statically generated a build time.
  };
}
