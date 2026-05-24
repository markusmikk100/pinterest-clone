"use client";

import { useState } from "react";
import Link from "next/link";

interface PinCardProps {
  id: string;
  imageUrl: string;
  title: string;
  username: string;
  initialSaved?: boolean;
}

export default function PinCard({ id, imageUrl, title, username, initialSaved = false }: PinCardProps) {
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  async function handleSave(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    const res = await fetch(`/api/pins/${id}/save`, { method: "POST" });
    const data = await res.json();

    if (res.ok) setSaved(data.saved);
    setLoading(false);
  }

  return (
    <Link href={`/pin/${id}`} className="group relative mb-4 cursor-pointer block">
      <div className="relative overflow-hidden rounded-2xl">
        <img src={imageUrl} alt={title} className="w-full object-cover" />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
        <button
          onClick={handleSave}
          disabled={loading}
          className={`absolute top-3 right-3 text-white text-sm font-bold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
            saved ? "bg-black hover:bg-gray-800" : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {saved ? "Saved" : "Save"}
        </button>
      </div>
      <div className="mt-2 px-1">
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-xs text-gray-500">{username}</p>
      </div>
    </Link>
  );
}