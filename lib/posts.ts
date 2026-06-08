import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content");

export interface Post {
  slug: string;
  title: string;
  tag: string;
  image: string;
  readTime: string;
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(postsDirectory);

  return files.map((file) => {
    const slug = file.replace(".md", "");

    const fullPath = path.join(postsDirectory, file);
    const source = fs.readFileSync(fullPath, "utf8");

    const { data } = matter(source);

    return {
      slug,
      title: data.title,
      tag: data.tag,
      image: data.image,
      readTime: data.readTime,
    };
  });
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  const source = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(source);

  return {
    frontmatter: data,
    content,
  };
}
