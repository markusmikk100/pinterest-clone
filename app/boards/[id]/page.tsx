import Navbar from "@/components/ui/navbar";
import MasonryGrid from "@/components/ui/MasonryGrid";

export default function BoardDetailPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Interior Design</h1>
          <p className="text-gray-500 mt-1">24 pins</p>
        </div>
        <MasonryGrid />
      </div>
    </main>
  );
}