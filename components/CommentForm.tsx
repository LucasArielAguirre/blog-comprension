"use client";

import { useState } from "react";
import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400" });

interface CommentFormProps {
  onCommentAdded: (comment: Comment) => void;
}

export interface Comment {
  id: string;
  nombre: string;
  apellido: string;
  asunto: string;
  mensaje: string;
  created_at: string;
}

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-amber-400/60 focus:bg-white/8 transition";

export function CommentForm({ onCommentAdded }: CommentFormProps) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    asunto: "",
    mensaje: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Ocurrió un error al enviar el comentario.");
        setStatus("error");
        return;
      }

      onCommentAdded(data);
      setForm({ nombre: "", apellido: "", asunto: "", mensaje: "" });
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setErrorMsg("No se pudo conectar con el servidor.");
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label
            htmlFor="nombre"
            className="block text-xs tracking-[0.15em] uppercase text-white/40"
          >
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            value={form.nombre}
            onChange={handleChange}
            placeholder="Juan"
            className={inputClass}
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="apellido"
            className="block text-xs tracking-[0.15em] uppercase text-white/40"
          >
            Apellido
          </label>
          <input
            id="apellido"
            name="apellido"
            type="text"
            required
            value={form.apellido}
            onChange={handleChange}
            placeholder="Pérez"
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="asunto"
          className="block text-xs tracking-[0.15em] uppercase text-white/40"
        >
          Asunto
        </label>
        <input
          id="asunto"
          name="asunto"
          type="text"
          required
          value={form.asunto}
          onChange={handleChange}
          placeholder="¿Sobre qué querés comentar?"
          className={inputClass}
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="mensaje"
          className="block text-xs tracking-[0.15em] uppercase text-white/40"
        >
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={4}
          value={form.mensaje}
          onChange={handleChange}
          placeholder="Escribí tu comentario acá..."
          className={inputClass + " resize-none"}
        />
      </div>

      {status === "error" && <p className="text-sm text-red-400">{errorMsg}</p>}
      {status === "success" && (
        <p className={instrumentSerif.className + " text-sm text-amber-400"}>
          ¡Comentario enviado con éxito!
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center gap-2 border border-amber-400/60 hover:border-amber-400 hover:bg-amber-400/10 disabled:opacity-40 px-6 py-2.5 text-xs tracking-[0.2em] uppercase text-amber-400 transition rounded-lg"
      >
        {status === "loading" ? (
          <>
            <svg
              className="h-3.5 w-3.5 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
              />
            </svg>
            Enviando...
          </>
        ) : (
          "Enviar comentario"
        )}
      </button>
    </form>
  );
}
