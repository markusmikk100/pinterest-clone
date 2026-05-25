"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function DeleteBoardButton({ boardId }: { boardId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this board?")) return;
    setLoading(true);

    await fetch(`/api/boards/${boardId}`, { method: "DELETE" });
    router.push("/boards");
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-2 mx-auto text-sm text-red-500 hover:text-red-600 font-semibold disabled:opacity-50"
    >
      <Trash2 className="w-4 h-4" />
      {loading ? "Deleting..." : "Delete Board"}
    </button>
  );
}