import React from "react";
import { Instrument_Serif, Playfair_Display } from "next/font/google";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";

const playfair = Playfair_Display({ subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
});

interface ArticleCardProps {
  image: string;
  slug: string;
  tag: string;
  title: string;
  readTime: string;
}

const ArticleCard = ({
  image,
  slug,
  tag,
  title,
  readTime,
}: ArticleCardProps) => {
  return (
    <a
      className="flex flex-wrap justify-center items-center gap-6 w-full md:w-auto"
      href={`/articles/${slug}`}
    >
      <div className="group relative w-[340px] h-[460px] rounded-2xl overflow-hidden cursor-pointer">
        <Image
          src={image}
          alt={title}
          loading="eager"
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 gap-3">
          <span
            className={
              instrumentSerif.className +
              " text-amber-400 text-xs tracking-[0.25em] uppercase"
            }
          >
            {tag}
          </span>

          <h3
            className={
              playfair.className +
              " text-white text-2xl leading-[1.2] tracking-[-0.02em]"
            }
          >
            {title}
          </h3>

          <div className="w-8 h-px bg-amber-400/60" />

          <div
            className={
              instrumentSerif.className +
              " flex items-center justify-between text-white/40 text-sm"
            }
          >
            <span>{readTime}</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </a>
  );
};

const Articles = () => {
  const posts = getAllPosts();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-10 px-6 py-24">
      <h1 className={playfair.className + " text-4xl md:text-5xl"}>
        Artículos
      </h1>

      <div className="flex flex-wrap md:flex-row md:flex-nowrap m-auto justify-center gap-6">
        {posts.map((post) => (
          <ArticleCard
            key={post.slug}
            slug={post.slug}
            image={post.image}
            tag={post.tag}
            title={post.title}
            readTime={post.readTime}
          />
        ))}
      </div>
    </div>
  );
};

export default Articles;
