import { prisma } from "@/lib/prisma";
import Navbar from "@/components/ui/navbar";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import SaveButton from "@/components/ui/SaveButton";
import DeletePinButton from "@/components/ui/DeletePinButton";

export default async function PinDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();

  const pin = await prisma.pin.findUnique({
    where: { id },
    include: { user: true, saves: true },
  });

  if (!pin) notFound();

  let isSaved = false;
  let isOwner = false;

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    isSaved = pin.saves.some((s) => s.userId === user?.id);
    isOwner = pin.userId === user?.id;
  }

  return (
    <main>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-10">
        <div className="flex flex-col md:flex-row gap-10 bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="md:w-1/2">
            <img src={pin.imageUrl} alt={pin.title} className="w-full h-full object-cover" />
          </div>
          <div className="md:w-1/2 p-8 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">{pin.title}</h1>
              <span className="text-sm text-gray-400">{pin.saves.length} saves</span>
            </div>

            {pin.description && (
              <p className="text-gray-600 text-sm">{pin.description}</p>
            )}

            <Link href={`/profile/${pin.user.id}`} className="flex items-center gap-3 mt-2">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-600">
                {pin.user.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-sm">{pin.user.name}</p>
                <p className="text-xs text-gray-400">View profile</p>
              </div>
            </Link>

            {isOwner ? (
              <DeletePinButton pinId={pin.id} />
            ) : (
              <SaveButton pinId={pin.id} initialSaved={isSaved} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}