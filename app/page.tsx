import Navbar from "@/components/ui/navbar";
import MasonryGrid from "@/components/ui/MasonryGrid";
import { getPins } from "@/lib/actions/pin.actions";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const session = await auth();
  const pins = await getPins();

  let savedPinIds: string[] = [];

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { saves: true },
    });
    savedPinIds = user?.saves.map((s) => s.pinId) ?? [];
  }

  return (
    <main>
      <Navbar />
      <div className="pt-6">
        {pins.length === 0 ? (
          <p className="text-center text-gray-400 mt-20">No pins yet!</p>
        ) : (
          <MasonryGrid pins={pins} savedPinIds={savedPinIds} />
        )}
      </div>
    </main>
  );
}