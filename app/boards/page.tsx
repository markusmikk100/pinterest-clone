import Navbar from "@/components/ui/navbar";
import BoardCard from "@/components/ui/BoardCard";
import { getBoards } from "@/lib/actions/board.actions";

export default async function BoardsPage() {
  // Hardcoded userId for now, will come from auth later
  const boards = await getBoards("placeholder-user-id");

  return (
    <main>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Your Boards</h1>
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-full text-sm transition">
            + Create Board
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {boards.length === 0 ? (
            <p className="text-gray-400 col-span-full text-center mt-10">No boards yet!</p>
          ) : (
            boards.map((board) => (
              <a key={board.id} href={`/boards/${board.id}`}>
                <BoardCard
                  name={board.name}
                  pinCount={board._count.pins}
                  coverImages={board.pins.map((p) => p.imageUrl)}
                />
              </a>
            ))
          )}
        </div>
      </div>
    </main>
  );
}