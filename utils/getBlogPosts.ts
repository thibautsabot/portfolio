import fs from "fs";
import { join } from "path";

export default function getBlogPosts({ limit = 10 }) {
    const blogPosts = fs.readdirSync(join(process.cwd(), "posts"));

    return blogPosts.splice(limit, blogPosts.length)
}