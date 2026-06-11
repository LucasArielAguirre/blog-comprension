"use client";

import React from "react";

import { Instrument_Serif } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { useGSAP } from "@gsap/react";
import {
  Highlighted1,
  Highlighted2,
  Highlighted3,
} from "./Highlights/highlights";
import { gsap } from "gsap";
import { ScrollTrigger, SplitText, DrawSVGPlugin } from "gsap/all";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

const playfair = Playfair_Display({ subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400" });

const Hero = () => {
  const heroRef = React.useRef<HTMLElement>(null);

  useGSAP(() => {
    const split = SplitText.create(heroRef.current!.querySelector("h1")!, {
      type: "words,chars",
      wordsClass: "word",
      charsClass: "char",
      mask: "chars",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top 80%",
        end: "bottom 20%",
      },
    });

    tl.from(split.chars, {
      y: "100%",
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: {
        each: 0.03,
        from: "start",
      },
    }).to(
      split.words,
      {
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
      },
      "-=0.3",
    );
    tl.from("path", {
      drawSVG: "0%",
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.2,
    });
    tl.from(".hrw", {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 0.6,
      ease: "power3.out",
    });
    tl.from(".image1", {
      y: 50,
      opacity: 0,
      width: 0,
      height: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.2,
    });
    return () => split.revert();
  }, [heroRef]);
  return (
    <main
      ref={heroRef}
      className="min-h-screen w-screen items-center flex flex-col justify-center gap-8 px-4"
    >
      <h1
        className={
          playfair.className +
          " text-[4em] md:text-[8em] text-start leading-[1.1] tracking-[-0.05em] sm:mx-auto md:mx-4 overflow-visible sm:text-wrap"
        }
      >
        COMPRENSIÓN DE <ScrollBasedWord />
      </h1>
      <hr className="w-full hrw" />
      <div className="flex justify-center gap-3">
        <Image
          src="/img1.webp"
          priority
          alt="secundaria a universidad un gran paso"
          width={300}
          height={200}
          className="rounded-lg shadow-lg image1  sm:hidden md:block -rotate-2"
        />
        <Image
          src="/img2.avif"
          priority
          alt="lo que aprendimos en la universidad"
          width={300}
          height={200}
          className="rounded-lg shadow-lg image1 md:block"
        />
        <Image
          src="/4.webp"
          priority
          alt="detras del proyecto"
          width={300}
          height={200}
          className="rounded-lg shadow-lg image1 sm:hidden md:block rotate-2"
        />
      </div>
    </main>
  );
};

export default Hero;

const ScrollTriggerWord = () => (
  <span className="relative">
    <Highlighted1 className="absolute top-[0.1em] left-0 w-[8em]" />
    Comprensión
  </span>
);
const ScrollBasedWord = () => (
  <span className="whitespace-nowrap relative">
    <Highlighted2 className="absolute bottom-0 left-[-0.3em] w-[4em] h-[1.4em]" />
    TEXTOS
  </span>
);

const ScrollBasedLine = () => (
  <span className="whitespace-nowrap relative">
    <Highlighted3 className="absolute bottom-0 left-0" />
    COMPRENSIÓN
  </span>
);
