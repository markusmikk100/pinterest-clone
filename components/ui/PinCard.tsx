"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SaveToBoardModal from "./SaveToBoardModal";

interface PinCardProps {
  id: string;
  imageUrl: string;
  title: string;
  username: string;
  initialSaved?: boolean;
  boardId?: string;
  canRemoveFromBoard?: boolean;
}

export default function PinCard({
  id,
  imageUrl,
  title,
  username,
  initialSaved = false,
  boardId,
  canRemoveFromBoard = false,
}: PinCardProps) {
  const router = useRouter();
  const [saved, setSaved] = useState(initialSaved);
  const [showModal, setShowModal] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);

  async function handleSave(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (saved) {
      setSaveLoading(true);
      const res = await fetch(`/api/pins/${id}/save`, { method: "POST" });
      const data = await res.json();
      if (res.ok) setSaved(data.saved);
      setSaveLoading(false);
      return;
    }

    setShowModal(true);
  }

  async function handleRemoveFromBoard(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!boardId || removeLoading) return;

    setRemoveLoading(true);
    const res = await fetch(`/api/boards/${boardId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pinId: id }),
    });

    setRemoveLoading(false);
    if (res.ok) router.refresh();
  }

  function handleClose() {
    setShowModal(false);
    setSaved(true);
  }

  return (
    <>
      <Link href={`/pin/${id}`} className="group relative mb-4 cursor-pointer block">
        <div className="relative overflow-hidden rounded-2xl">
          <img src={imageUrl} alt={title} className="w-full object-cover" />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
          <button
            onClick={handleSave}
            disabled={saveLoading}
            className={`absolute top-3 right-3 text-white text-sm font-bold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-70 ${
              saved ? "bg-black hover:bg-gray-800" : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {saveLoading ? "..." : saved ? "Saved" : "Save"}
          </button>

          {canRemoveFromBoard && boardId && (
            <button
              onClick={handleRemoveFromBoard}
              disabled={removeLoading}
              className="absolute top-3 left-3 bg-white text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 disabled:opacity-70"
            >
              {removeLoading ? "Removing..." : "Remove"}
            </button>
          )}
        </div>
        <div className="mt-2 px-1">
          <p className="font-semibold text-sm">{title}</p>
          <p className="text-xs text-gray-500">{username}</p>
        </div>
      </Link>

      {showModal && (
        <SaveToBoardModal pinId={id} onClose={handleClose} />
      )}
    </>
  );
}