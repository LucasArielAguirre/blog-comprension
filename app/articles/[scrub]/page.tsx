import { notFound } from "next/navigation";
import { Instrument_Serif, Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import ReadArticleButton from "@/components/ReadArticleButton";

import { CommentsSection } from "@/components/CommentsSection";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({ subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
});

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    scrub: post.slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ scrub: string }>;
}) {
  const { scrub } = await params;

  let post;

  try {
    post = getPostBySlug(scrub);
  } catch {
    notFound();
  }

  const { frontmatter, content } = post;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero */}
      <div className="relative w-full h-[60vh]">
        <Image
          src={frontmatter.image}
          alt={frontmatter.title}
          fill
          className="object-cover"
        />

        <Link
          href="../"
          className="absolute top-6 left-6 rounded bg-white text-black shadow-amber-400 w-10 h-10 z-10 flex items-center justify-center"
        >
          ←
        </Link>

        <span className="rounded bg-black text-white shadow-amber-400 w-10 h-10 z-10">
          <Link
            href="./"
            className="rounded bg-black text-white shadow-amber-400 w-10 h-10 z-10"
          >
            - Volver a artículos
          </Link>
        </span>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-10 max-w-3xl mx-auto">
          <span
            className={
              instrumentSerif.className +
              " text-amber-400 text-xs tracking-[0.25em] uppercase"
            }
          >
            {frontmatter.tag}
          </span>

          <h1
            className={
              playfair.className +
              " text-4xl md:text-5xl mt-3 leading-[1.15] tracking-[-0.02em]"
            }
          >
            {frontmatter.title}
          </h1>

          <p
            className={
              instrumentSerif.className + " text-white/40 text-sm mt-4"
            }
          >
            {frontmatter.readTime}
          </p>
        </div>
      </div>

      {/* Contenido */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        <ReadArticleButton text={content} />
        <div
          className={
            instrumentSerif.className +
            " text-white/80 text-lg leading-7 tracking-wide"
          }
        >
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold mt-10 mb-6">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-3xl font-semibold mt-10 mb-5">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl font-medium mt-8 mb-4">{children}</h3>
              ),
              p: ({ children }) => <p className="mb-6">{children}</p>,
              ul: ({ children }) => (
                <ul className="list-disc pl-6 mb-6">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-6 mb-6">{children}</ol>
              ),
              li: ({ children }) => <li className="mb-2">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-amber-400 pl-4 italic my-6">
                  {children}
                </blockquote>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </article>

      <div className="w-full h-px bg-white/10">
        <CommentsSection slug={scrub} />
      </div>
    </main>
  );
}
