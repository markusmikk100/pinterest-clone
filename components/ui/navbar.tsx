import { Search } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4">
      {/* Logo */}
      <div className="text-red-500 font-bold text-2xl shrink-0">
        Pinterest
      </div>

      {/* Links */}
      <div className="flex gap-2 shrink-0">
        <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold">
          Home
        </button>
        <button className="hover:bg-gray-100 px-4 py-2 rounded-full text-sm font-semibold">
          Create
        </button>
      </div>

      {/* Search */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-100 rounded-full pl-9 pr-4 py-2 text-sm outline-none focus:bg-gray-200 transition"
        />
      </div>

      {/* Avatar placeholder */}
      <div className="w-9 h-9 rounded-full bg-gray-300 shrink-0" />
    </nav>
  );
}