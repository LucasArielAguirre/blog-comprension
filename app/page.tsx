import { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Articles from "@/components/Articles";
export default function Home() {
  return (
    <main className="bg-white text-black min-h-screen w-full">
      <Nav />
      <Hero />
      <Articles />
    </main>
  );
}
