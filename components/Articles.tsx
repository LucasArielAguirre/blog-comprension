import React from "react";
import { Instrument_Serif, Playfair_Display } from "next/font/google";
import Image from "next/image";

const playfair = Playfair_Display({ subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400" });

interface ArticleCardProps {
  image: string;
  scrub: string;
  tag: string;
  title: string;
  readTime: string;
}

const ArticleCard = ({ image, tag, title, readTime }: ArticleCardProps) => (
  <div className="group relative w-[340px] h-[460px] rounded-2xl overflow-hidden cursor-pointer">
    <Image
      src={image}
      alt={title}
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
);

const ARTICLES = [
  {
    image: "/1.avif",
    scrub: "comprensión lectora",
    tag: "Comprensión lectora",
    title: "Cómo leer un texto con profundidad",
    readTime: "5 min de lectura",
  },
  {
    image: "/2.avif",
    scrub: "estrategias",
    tag: "Estrategias",
    title: "Técnicas para retener lo que leés",
    readTime: "4 min de lectura",
  },
];

const Articles = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center gap-6 flex-wrap px-6">
      {ARTICLES.map((article, i) => (
        <ArticleCard key={i} {...article} />
      ))}
    </div>
  );
};

export default Articles;
