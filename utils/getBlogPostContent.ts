import { bundleMDX } from 'mdx-bundler'
import fs from "fs";
import { join } from "path";

export interface BlogContent {
  code: string;
  frontmatter: {
      [key: string]: unknown;
  };
}

export default async function getBlogPostContent(slug: string): Promise<BlogContent> {
  const rawText = fs.readFileSync(join(process.cwd(), 'posts', `${slug}.mdx`), 'utf8');
  const blogContent = await bundleMDX(rawText)
  const { code, frontmatter } = blogContent

  return { code, frontmatter }
}