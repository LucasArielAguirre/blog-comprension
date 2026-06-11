import { Instrument_Serif, Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const playfair = Playfair_Display({ subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
});

export default function About() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <section className="relative h-[52vh] w-full overflow-hidden">
        <Image
          src="/img1.webp"
          alt="Sobre nosotros"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/45 to-transparent" />

        <Link
          href="/"
          className="absolute top-6 left-6 z-10 flex h-10 w-10 items-center justify-center rounded bg-white text-black shadow-amber-400"
        >
          ←
        </Link>

        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-4xl px-6 py-10 md:px-10">
          <span
            className={
              instrumentSerif.className +
              " text-amber-400 text-xs tracking-[0.25em] uppercase"
            }
          >
            Sobre nosotros
          </span>

          <h1
            className={
              playfair.className +
              " mt-3 text-4xl md:text-5xl leading-[1.1] tracking-[-0.03em]"
            }
          >
            Bloglify
          </h1>

          <p
            className={
              instrumentSerif.className +
              " mt-4 text-white/75 text-lg max-w-2xl"
            }
          >
            Un espacio pensado para acompañar a estudiantes en el salto del
            secundario a la universidad, con experiencias reales y una mirada
            cercana.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
          <div
            className={
              instrumentSerif.className +
              " text-white/80 text-lg leading-8 tracking-wide"
            }
          >
            <h2 className="mb-4 text-3xl font-semibold text-white">
              Quiénes somos
            </h2>
            <p className="mb-6">
              Somos estudiantes de Desarrollo de Software de último año del IES
              9-012. Este blog nace de nuestra propia experiencia y de todo lo
              que fuimos aprendiendo en el camino entre la secundaria y la
              universidad.
            </p>
            <p className="mb-6">
              Queremos compartir herramientas, ideas y reflexiones que sirvan de
              apoyo a otros estudiantes que estén atravesando una etapa
              parecida.
            </p>

            <h3 className="mt-10 mb-4 text-2xl font-semibold text-white">
              Qué proponemos
            </h3>
            <p>
              Un espacio simple, claro y cercano, donde conviven consejos de
              lectura, organización y adaptación con experiencias reales del
              recorrido académico.
            </p>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <p
              className={
                instrumentSerif.className +
                " text-amber-400 text-xs tracking-[0.25em] uppercase"
              }
            >
              Bloglify
            </p>
            <div className="mt-5 space-y-4 text-white/80">
              <div>
                <p className="text-sm text-white/45">Institución</p>
                <p className="text-lg">IES 9-012</p>
              </div>
              <div>
                <p className="text-sm text-white/45">Carrera</p>
                <p className="text-lg">Desarrollo de Software</p>
              </div>
              <div>
                <p className="text-sm text-white/45">Enfoque</p>
                <p className="text-lg">
                  Experiencias, consejos y lectura para estudiantes
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
