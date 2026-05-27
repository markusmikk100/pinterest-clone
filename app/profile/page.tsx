import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/ui/navbar";
import MasonryGrid from "@/components/ui/MasonryGrid";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      pins: { include: { user: true } },
      saves: true,
      boards: {
        include: {
          _count: { select: { boardPin: true } },
          boardPin: {
            take: 1,
            include: { pin: { select: { imageUrl: true } } },
          },
        },
      },
      _count: {
        select: { pins: true, followers: true, following: true },
      },
    },
  });

  if (!user) redirect("/login");

  const savedPinIds = user.saves.map((s) => s.pinId);

  return (
    <main>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-10">
        <div className="flex flex-col items-center text-center gap-3 mb-8">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold text-gray-600">
            {user.name?.[0]?.toUpperCase()}
          </div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-500 text-sm">{user.email}</p>

          <div className="flex gap-6 mt-2 text-sm">
            <div className="text-center">
              <p className="font-bold">{user._count.pins}</p>
              <p className="text-gray-500">Pins</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{user._count.followers}</p>
              <p className="text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{user._count.following}</p>
              <p className="text-gray-500">Following</p>
            </div>
          </div>
        </div>

        {/* Boards */}
        {user.boards.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-4">Boards</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {user.boards.map((board) => (
                <Link key={board.id} href={`/boards/${board.id}`}>
                  <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-square">
                    {board.boardPin[0] ? (
                      <img src={board.boardPin[0].pin.imageUrl} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                  </div>
                  <p className="text-sm font-semibold mt-1">{board.name}</p>
                  <p className="text-xs text-gray-500">{board._count.boardPin} pins</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Pins */}
        <h2 className="text-lg font-bold mb-4">Pins</h2>
        {user.pins.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">No pins yet!</p>
        ) : (
          <MasonryGrid pins={user.pins} savedPinIds={savedPinIds} />
        )}
      </div>
    </main>
  );
}