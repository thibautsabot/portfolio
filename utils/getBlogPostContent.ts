import fs from "fs";
import { join } from "path";

export default function getBlogPostContent(slug: string): string {
    return fs.readFileSync(join(process.cwd(), 'posts', `${slug}.mdx`), 'utf8');
}