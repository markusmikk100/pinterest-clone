"use client";

import { useEffect, useState } from "react";
import { X, Plus } from "lucide-react";

interface Board {
  id: string;
  name: string;
}

interface SaveToBoardModalProps {
  pinId: string;
  onClose: () => void;
}

export default function SaveToBoardModal({ pinId, onClose }: SaveToBoardModalProps) {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [newBoardName, setNewBoardName] = useState("");
  const [showNewBoard, setShowNewBoard] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetch("/api/boards")
      .then((r) => r.json())
      .then((data) => {
        setBoards(data);
        setLoading(false);
      });
  }, []);

  async function saveToBoard(boardId: string) {
    setSaving(boardId);
    await fetch(`/api/pins/${pinId}/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ boardId }),
    });
    setSaving(null);
    onClose();
  }

  async function createBoard() {
    if (!newBoardName.trim()) return;
    setCreating(true);

    const res = await fetch("/api/boards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newBoardName }),
    });

    const board = await res.json();
    setBoards((prev) => [...prev, board]);
    setNewBoardName("");
    setShowNewBoard(false);
    setCreating(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Save to board</h2>
          <button onClick={onClose} className="hover:bg-gray-100 p-1 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-400 py-6">Loading boards...</p>
        ) : (
          <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
            {boards.map((board) => (
              <button
                key={board.id}
                onClick={() => saveToBoard(board.id)}
                disabled={saving === board.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition text-left disabled:opacity-50"
              >
                <div className="w-10 h-10 rounded-lg bg-gray-200 shrink-0" />
                <span className="font-semibold text-sm">{board.name}</span>
                {saving === board.id && <span className="ml-auto text-xs text-gray-400">Saving...</span>}
              </button>
            ))}

            {boards.length === 0 && !showNewBoard && (
              <p className="text-center text-gray-400 text-sm py-4">No boards yet</p>
            )}
          </div>
        )}

        {/* Create new board */}
        {showNewBoard ? (
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Board name"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none"
              autoFocus
            />
            <button
              onClick={createBoard}
              disabled={creating}
              className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-600 disabled:opacity-50"
            >
              {creating ? "..." : "Create"}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowNewBoard(true)}
            className="mt-4 w-full flex items-center gap-2 justify-center py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition text-sm font-semibold"
          >
            <Plus className="w-4 h-4" />
            Create board
          </button>
        )}
      </div>
    </div>
  );
}