import Navbar from "@/components/ui/navbar";
import MasonryGrid from "@/components/ui/MasonryGrid";
import { getBoardById } from "@/lib/actions/board.actions";

export default async function BoardDetailPage({ params }: { params: { id: string } }) {
  const board = await getBoardById(params.id);

  if (!board) return <p className="text-center mt-20 text-gray-400">Board not found</p>;

  return (
    <main>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">{board.name}</h1>
          <p className="text-gray-500 mt-1">{board.pins.length} pins</p>
        </div>

        {board.pins.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">No pins in this board yet!</p>
        ) : (
          <MasonryGrid pins={board.pins} />
        )}
      </div>
    </main>
  );
}