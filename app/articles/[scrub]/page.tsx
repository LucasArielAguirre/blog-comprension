import { notFound } from "next/navigation";
import { Instrument_Serif, Playfair_Display } from "next/font/google";
import Image from "next/image";
import { CommentsSection } from "@/components/CommentsSection";
const playfair = Playfair_Display({ subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400" });
import Link from "next/link";
const ARTICLES = [
  {
    image: "/1.avif",
    scrub: "secundaria-a-universidad",
    tag: "Educación · Experiencia personal",
    title: "De la secundaria a la universidad: lo que nos costó a los dos",
    readTime: "6 min de lectura",
    content: `
Somos dos amigos que pasamos por el mismo salto y lo vivimos diferente. Pero cuando comparamos nuestras historias, nos dimos cuenta de que el problema era el mismo.

Cómo empezó todo

Cuando entramos a la universidad, los dos pensamos que sería una continuación de lo que ya veníamos haciendo. Nos equivocamos. Casi de inmediato nos dimos cuenta de que las exigencias eran completamente diferentes: los textos eran más extensos, más complejos, y requerían una comprensión mucho más profunda. Lo que más nos costó, aunque de maneras distintas, fue adaptarnos a una nueva forma de estudiar y de leer que nunca habíamos necesitado desarrollar antes.

Dos experiencias, el mismo choque

Uno de nosotros sintió que el problema estaba en los hábitos de estudio: en la secundaria nunca había necesitado organizarse de verdad, porque con poco esfuerzo alcanzaba para aprobar. Los contenidos llegaban guiados, resumidos, casi masticados. En la facultad, eso desapareció de golpe.

El otro lo vivió más desde la lectura: pensó que los textos universitarios iban a ser parecidos a los de la escuela. No fue así. Comprender, relacionar conceptos y elaborar opiniones propias se volvió fundamental desde el primer mes. En la secundaria rara vez había necesitado hacer algo así — muchas veces alcanzaba con leer por encima o memorizar algunas ideas.

Cuando lo hablamos, nos dimos cuenta de que, aunque el punto de entrada era distinto, los dos estábamos describiendo lo mismo: una brecha entre lo que la escuela nos había dado y lo que la universidad nos pedía.

Lo que la secundaria no nos enseñó

No decimos esto para criticar a nuestros profesores ni a nuestras escuelas. Pero sí creemos que hay habilidades que el nivel secundario no siempre trabaja con la profundidad necesaria: la comprensión lectora real, las estrategias para analizar textos complejos, la autonomía para organizar el propio aprendizaje.

En la secundaria se evalúa si leíste, pero no siempre si entendiste, si pudiste relacionar ideas o si formaste una opinión propia. Eso se nota cuando llegás a la facultad y de repente todo eso se da por supuesto.

A eso se suma la presión emocional del cambio: nuevos horarios, nuevos compañeros, nuevas exigencias. Y muchas veces la sensación de que todos los demás lo están manejando mejor que vos.

Lo que fuimos aprendiendo

Con el tiempo, los dos fuimos encontrando nuestro ritmo. No fue inmediato ni sencillo, pero la adaptación fue posible. Aprendimos a planificar mejor el tiempo, a leer de otra manera, a buscar ayuda cuando era necesario y a no frustrarnos ante los primeros tropiezos.

Si pudiéramos volver al primer día de facultad, esto es lo que nos diríamos:

01 — Organizá tu tiempo desde el inicio. Los contenidos son más amplios y no alcanza con estudiar la noche antes.

02 — Desarrollá el hábito de leer seguido, aunque sean textos cortos. La comprensión se entrena.

03 — Aprovechá las clases: tomá apuntes, participá y consultá las dudas sin miedo.

04 — No te compares. Cada uno llega con una mochila distinta y el proceso de adaptación es personal.

Una transición que se puede mejorar

Creemos que el paso de la secundaria a la universidad no debería ser tan difícil como lo fue para nosotros. Y no porque seamos casos excepcionales — al contrario. Sabemos que muchos estudiantes viven algo similar y que la tasa de abandono en el primer año universitario en Argentina es muy alta.

La educación secundaria necesita preparar mejor a los estudiantes, no solo en contenidos, sino en comprensión lectora, pensamiento crítico y autonomía. Entender las dificultades que atraviesan quienes ingresan a la facultad es fundamental para construir un sistema educativo más conectado y accesible.

Con esfuerzo, paciencia y las herramientas correctas, la adaptación es posible. Lo vivimos. Y si estás pasando por lo mismo, te decimos: no estás solo.

- Lucas Aguirre | Agustin Reynals
`,
  },
];

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ scrub: a.scrub }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ scrub: string }>;
}) {
  const { scrub } = await params;
  const article = ARTICLES.find((a) => a.scrub === scrub);
  if (!article) notFound();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero */}
      <div className="relative w-full h-[60vh]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
        />
        <Link
          href={"../"}
          className="absolute top-6 left-6 rounded bg-white text-black shadow-amber-400 w-10 h-10 z-10 flex items-center justify-center"
        >
          ←
        </Link>
        <span className=" rounded bg-black text-white shadow-amber-400 w-10 h-10 z-10">
          <Link
            href={"./"}
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
            {article.tag}
          </span>
          <h1
            className={
              playfair.className +
              " text-4xl md:text-5xl mt-3 leading-[1.15] tracking-[-0.02em]"
            }
          >
            {article.title}
          </h1>
          <p
            className={
              instrumentSerif.className + " text-white/40 text-sm mt-4"
            }
          >
            {article.readTime}
          </p>
        </div>
      </div>

      {/* Contenido */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div
          className={
            instrumentSerif.className +
            " text-white/80 text-lg whitespace-pre-line leading-7 tracking-wide"
          }
        >
          {article.content}
        </div>
      </article>

      <div className="w-full h-px bg-white/10">
        <CommentsSection />
      </div>
    </main>
  );
}
