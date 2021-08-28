import getBlogPosts from "../../utils/getBlogPosts";
import getBlogPostContent from "../../utils/getBlogPostContent";

interface Props {
  content: string
}

export default function BlogPost({ content }: Props) {
  return <div>Hello {content}</div>;
}

export async function getStaticProps({ params }) {
  const content = getBlogPostContent(params.slug);

  return {
    props: {
      content,
    },
  };
}

// Statically generate all blog posts
export async function getStaticPaths() {
  const blogPosts = getBlogPosts({ limit: 0 });

  return {
    paths: blogPosts.map((post) => ({
      params: { slug: post.replace(".mdx", "") },
    })),
    fallback: false, // Every pages are statically generated a build time.
  };
}
