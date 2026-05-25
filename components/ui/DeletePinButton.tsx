"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeletePinButton({ pinId }: { pinId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    if (!confirm("Delete this pin?")) return;
    setLoading(true);

    const res = await fetch(`/api/pins/${pinId}`, { method: "DELETE" });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Failed to delete");
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handleDelete}
        disabled={loading}
        className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 font-semibold disabled:opacity-50"
      >
        <Trash2 className="w-4 h-4" />
        {loading ? "Deleting..." : "Delete Pin"}
      </button>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}