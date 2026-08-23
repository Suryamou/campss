"use client";

import { useState } from "react";
import { readVegetationHistory, saveVegetationView } from "@/lib/vegetasi";

export default function MarkVegetationLearned({ slug }: { slug: string }) {
  const [learned, setLearned] = useState(() =>
    readVegetationHistory().some((item) => item.slug === slug)
  );

  function markAsLearned() {
    saveVegetationView(slug);
    setLearned(true);
  }

  return (
    <button
      type="button"
      onClick={markAsLearned}
      disabled={learned}
      className="mt-6 rounded-lg border border-[#17634a] px-5 py-3 text-sm font-semibold text-[#17634a] transition hover:bg-[#e9f7f1] disabled:cursor-default disabled:border-[#9cc9b6] disabled:bg-[#e9f7f1] disabled:text-[#17634a]"
    >
      {learned ? "Sudah Dipelajari" : "Tandai Sudah Dipelajari"}
    </button>
  );
}
