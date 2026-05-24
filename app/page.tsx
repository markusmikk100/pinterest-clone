import Navbar from "@/components/ui/navbar";
import MasonryGrid from "@/components/ui/MasonryGrid";
import { getPins } from "@/lib/actions/pin.actions";

export default async function Home() {
  const pins = await getPins();

  return (
    <main>
      <Navbar />
      <div className="pt-6">
        {pins.length === 0 ? (
          <p className="text-center text-gray-400 mt-20">No pins yet!</p>
        ) : (
          <MasonryGrid pins={pins} />
        )}
      </div>
    </main>
  );
}