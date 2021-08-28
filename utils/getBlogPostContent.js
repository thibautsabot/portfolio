import fs from "fs";
import { join } from "path";

export default function getBlogPostContent(slug) {
    return fs.readFileSync(join(process.cwd(), 'posts', `${slug}.mdx`), 'utf8');
}