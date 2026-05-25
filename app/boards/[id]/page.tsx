import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import Navbar from "@/components/ui/navbar";
import MasonryGrid from "@/components/ui/MasonryGrid";
import { notFound } from "next/navigation";
import DeleteBoardButton from "@/components/ui/DeleteBoardButton";

export default async function BoardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();

  const board = await prisma.board.findUnique({
    where: { id },
    include: {
      pins: { include: { user: true } },
      user: true,
    },
  });

  if (!board) notFound();

  let savedPinIds: string[] = [];
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { saves: true },
    });
    savedPinIds = user?.saves.map((s) => s.pinId) ?? [];
  }

  const isOwner = session?.user?.email === board.user.email;

  return (
    <main>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <div className="text-center mb-8 relative">
          <h1 className="text-3xl font-bold">{board.name}</h1>
          <p className="text-gray-500 mt-1">{board.pins.length} pins</p>
          {isOwner && (
            <div className="mt-4">
              <DeleteBoardButton boardId={board.id} />
            </div>
          )}
        </div>

        {board.pins.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">No pins in this board yet!</p>
        ) : (
          <MasonryGrid pins={board.pins} savedPinIds={savedPinIds} />
        )}
      </div>
    </main>
  );
}