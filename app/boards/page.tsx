import Navbar from "@/components/ui/navbar";
import BoardCard from "@/components/ui/BoardCard";

const DUMMY_BOARDS = [
  {
    id: "1",
    name: "Interior Design",
    pinCount: 24,
    coverImages: [
      "https://picsum.photos/seed/1/400/600",
      "https://picsum.photos/seed/2/400/300",
      "https://picsum.photos/seed/3/400/500",
    ],
  },
  {
    id: "2",
    name: "Travel Goals",
    pinCount: 18,
    coverImages: [
      "https://picsum.photos/seed/8/400/650",
      "https://picsum.photos/seed/6/400/550",
      "https://picsum.photos/seed/9/400/450",
    ],
  },
  {
    id: "3",
    name: "Food Inspo",
    pinCount: 31,
    coverImages: [
      "https://picsum.photos/seed/5/400/400",
      "https://picsum.photos/seed/10/400/500",
    ],
  },
  {
    id: "4",
    name: "Fashion",
    pinCount: 12,
    coverImages: [
      "https://picsum.photos/seed/4/400/700",
    ],
  },
  {
    id: "5",
    name: "Fitness",
    pinCount: 9,
    coverImages: [],
  },
];

export default function BoardsPage() {
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
          {DUMMY_BOARDS.map((board) => (
            <a key={board.id} href={`/boards/${board.id}`}>
              <BoardCard {...board} />
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}