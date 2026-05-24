import Navbar from "@/components/ui/navbar";
import MasonryGrid from "@/components/ui/MasonryGrid";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="pt-6">
        <MasonryGrid />
      </div>
    </main>
  );
}