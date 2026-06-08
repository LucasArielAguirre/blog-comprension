"use client";

import { useEffect, useState } from "react";
import { Instrument_Serif, Playfair_Display } from "next/font/google";
import { CommentForm, type Comment } from "./CommentForm";

const playfair = Playfair_Display({ subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
});

interface CommentsSectionProps {
  slug: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function CommentCard({ comment }: { comment: Comment }) {
  const initials = `${comment.nombre[0]}${comment.apellido[0]}`.toUpperCase();

  return (
    <article className="flex gap-5">
      <div className="flex-shrink-0 h-10 w-10 rounded-full border border-amber-400/30 flex items-center justify-center text-xs font-medium text-amber-400">
        {initials}
      </div>

      <div className="flex-1 min-w-0 pt-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
          <span className={instrumentSerif.className + " text-white text-base"}>
            {comment.nombre} {comment.apellido}
          </span>

          <span className="text-xs text-white/30">
            {formatDate(comment.created_at)}
          </span>
        </div>

        <p className="mt-0.5 text-xs tracking-[0.15em] uppercase text-amber-400/70">
          {comment.asunto}
        </p>

        <p
          className={
            instrumentSerif.className +
            " mt-2 text-white/60 text-base leading-relaxed whitespace-pre-wrap"
          }
        >
          {comment.mensaje}
        </p>
      </div>
    </article>
  );
}

export function CommentsSection({ slug }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("SLUG:", slug);
    async function loadComments() {
      try {
        const res = await fetch(`/api/comments?post_id=${slug}`);

        const data = await res.json();

        if (Array.isArray(data)) {
          setComments(data);
        } else {
          setError("No se pudieron cargar los comentarios.");
        }
      } catch {
        setError("No se pudo conectar con el servidor.");
      } finally {
        setLoading(false);
      }
    }

    loadComments();
  }, [slug]);

  const handleCommentAdded = (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex items-baseline gap-4 mb-10">
        <h2 className={playfair.className + " text-2xl text-white"}>
          Comentarios
        </h2>

        {!loading && (
          <span className="text-xs tracking-[0.2em] uppercase text-white/30">
            {comments.length}{" "}
            {comments.length === 1 ? "respuesta" : "respuestas"}
          </span>
        )}
      </div>

      <div className="border border-white/10 rounded-xl p-6 mb-12 bg-white/[0.02]">
        <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-6">
          Dejá tu comentario
        </p>

        <CommentForm slug={slug} onCommentAdded={handleCommentAdded} />
      </div>

      {loading && (
        <div className="space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-5 animate-pulse">
              <div className="h-10 w-10 rounded-full bg-white/5 flex-shrink-0" />

              <div className="flex-1 space-y-2 pt-1">
                <div className="h-3 w-36 rounded bg-white/5" />
                <div className="h-2 w-24 rounded bg-white/5" />
                <div className="h-3 w-full rounded bg-white/5" />
                <div className="h-3 w-3/4 rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && error && <p className="text-sm text-red-400">{error}</p>}

      {!loading && !error && comments.length === 0 && (
        <p
          className={
            instrumentSerif.className +
            " text-white/30 text-center py-10 text-lg"
          }
        >
          Todavía no hay comentarios. ¡Sé el primero!
        </p>
      )}

      {!loading && !error && comments.length > 0 && (
        <div className="divide-y divide-white/[0.06]">
          {comments.map((comment) => (
            <div key={comment.id} className="py-8 first:pt-0">
              <CommentCard comment={comment} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
