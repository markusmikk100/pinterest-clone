"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/ui/navbar";
import BoardCard from "@/components/ui/BoardCard";
import Link from "next/link";
import { Plus, X } from "lucide-react";

interface Board {
  id: string;
  name: string;
  _count: { pins: number };
  pins: { imageUrl: string }[];
}

export default function BoardsPage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchBoards();
  }, []);

  async function fetchBoards() {
    const res = await fetch("/api/boards?full=true");
    const data = await res.json();
    setBoards(data);
    setLoading(false);
  }

  async function createBoard() {
    if (!boardName.trim()) return;
    setCreating(true);

    await fetch("/api/boards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: boardName }),
    });

    setBoardName("");
    setShowModal(false);
    setCreating(false);
    fetchBoards();
  }

  return (
    <main>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Your Boards</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-full text-sm transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Board
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-400 mt-20">Loading boards...</p>
        ) : boards.length === 0 ? (
          <p className="text-center text-gray-400 mt-20">No boards yet! Create one.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {boards.map((board) => (
              <Link key={board.id} href={`/boards/${board.id}`}>
                <BoardCard
                  name={board.name}
                  pinCount={board._count.pins}
                  coverImages={board.pins.map((p) => p.imageUrl)}
                />
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Create Board Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Create Board</h2>
              <button onClick={() => setShowModal(false)} className="hover:bg-gray-100 p-1 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Board name"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createBoard()}
              autoFocus
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 mb-4"
            />
            <button
              onClick={createBoard}
              disabled={creating || !boardName.trim()}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl text-sm transition disabled:opacity-50"
            >
              {creating ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}