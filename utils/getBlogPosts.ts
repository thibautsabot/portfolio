import fs from "fs";
import { join } from "path";

export default function getBlogPosts({
  limit = 10,
}: {
  limit?: number;
}): string[] {
  const blogPosts = fs.readdirSync(join(process.cwd(), "pages", "blog"));

  // TODO: Sort by last date
  const curatedBlocPosts = blogPosts
    .filter((post) => post !== "index.tsx")
    .map((post) => post.replace(/.mdx/, ""))

  curatedBlocPosts.splice(limit, curatedBlocPosts.length)

  return curatedBlocPosts
}
