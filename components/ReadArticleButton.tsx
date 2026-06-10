"use client";

import { useState } from "react";

interface ReadArticleButtonProps {
  text: string;
}

export default function ReadArticleButton({ text }: ReadArticleButtonProps) {
  const [reading, setReading] = useState(false);

  const cleanMarkdown = (text: string) => {
    return text
      .replace(/^#{1,6}\s+/gm, "") // títulos
      .replace(/\*\*(.*?)\*\*/g, "$1") // negrita
      .replace(/\*(.*?)\*/g, "$1") // cursiva
      .replace(/`(.*?)`/g, "$1") // código inline
      .replace(/!\[.*?\]\(.*?\)/g, "") // imágenes
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // enlaces
      .replace(/^\s*[-*+]\s+/gm, "") // listas
      .replace(/\n{2,}/g, ". ") // párrafos
      .trim();
  };

  const startReading = () => {
    speechSynthesis.cancel();

    const cleanText = cleanMarkdown(text);

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "es-AR";

    utterance.onend = () => setReading(false);

    speechSynthesis.speak(utterance);
    setReading(true);
  };

  const stopReading = () => {
    speechSynthesis.cancel();
    setReading(false);
  };

  return (
    <button
      onClick={reading ? stopReading : startReading}
      className="mb-8 px-4 py-2 rounded-lg border border-amber-400 text-amber-400 hover:bg-amber-400/10 transition"
    >
      {reading ? "⏹ Detener lectura" : "🔊 Escuchar artículo"}
    </button>
  );
}
