"use client";

import { useState } from "react";

export default function SaveButton({ pinId, initialSaved }: { pinId: string; initialSaved: boolean }) {
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    const res = await fetch(`/api/pins/${pinId}/save`, { method: "POST" });
    const data = await res.json();
    if (res.ok) setSaved(data.saved);
    setLoading(false);
  }

  return (
    <button
      onClick={handleSave}
      disabled={loading}
      className={`w-full py-3 rounded-xl font-semibold text-white transition disabled:opacity-50 ${
        saved ? "bg-black hover:bg-gray-800" : "bg-red-500 hover:bg-red-600"
      }`}
    >
      {loading ? "..." : saved ? "Saved" : "Save"}
    </button>
  );
}