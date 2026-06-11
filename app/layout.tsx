import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bloglify - Blog para estudiantes",
  description:
    "Estudiantes de Tecnicatura en Desarrollo de software • 3° año. Contamos nuestro paso de la secundaria a la educación superior: experiencias reales, consejos útiles y todo lo que aprendimos en el camino.",
  authors: [
    {
      name: "Aguirre Lucas | Agustin Reynals",
    },
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Bloglify - Blog para estudiantes",
    description:
      "Estudiantes de Tecnicatura en Desarrollo de software • 3° año. Contamos nuestro paso de la secundaria a la educación superior: experiencias reales, consejos útiles y todo lo que aprendimos en el camino.",
    url: "https://bloglify.vercel.app",
    siteName: "Bloglify",
    images: [
      {
        url: "https://blog-comprension.vercel.app/logo.png",
        width: 1200,
        height: 630,
        alt: "Bloglify - Blog para estudiantes",
      },
    ],
    locale: "es-AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
