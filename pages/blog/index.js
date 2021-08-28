import getBlogPosts from "../../utils/getBlogPosts";

export default function Blog({ posts }) {
  return (
    <div>
      {posts.map((post, i) => {
        return <p key={i}>{post}</p>;
      })}
    </div>
  );
}

// Get the 5 first post
export async function getStaticProps() {
  const posts = getBlogPosts({ limit: 5 });

  return {
    props: {
      posts,
    },
  };
}
