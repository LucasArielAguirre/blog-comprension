"use client";

import { useState } from "react";

interface ReadArticleButtonProps {
  text: string;
}

export default function ReadArticleButton({ text }: ReadArticleButtonProps) {
  const [reading, setReading] = useState(false);

  const startReading = () => {
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
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
