import fs from "fs";
import { join } from "path";

export default function getBlogPosts({ limit = 10 }: { limit?: number }): string[] {
    const blogPosts = fs.readdirSync(join(process.cwd(), "posts"));

    // TODO: Sort by last date
    blogPosts.splice(limit, blogPosts.length)
    return blogPosts.map((post) => post.replace(/.mdx/, ''))
}