"use client";

import { Search } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav style={{ backgroundColor: 'var(--background)' }} className="sticky top-0 z-50 border-b border-gray-200 px-4 py-3 flex items-center gap-4">
      {/* Logo */}
      <Link href="/" className="text-red-500 font-bold text-2xl shrink-0">
        Pinterest
      </Link>

      {/* Links */}
      <div className="flex gap-2 shrink-0">
        <Link href="/boards" className="hover:bg-gray-100 px-4 py-2 rounded-full text-sm font-semibold">
          Boards
        </Link>
      </div>
          <Link href="/create" className="hover:bg-gray-100 px-4 py-2 rounded-full text-sm font-semibold">
            Create
          </Link>

      {/* Search */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-full pl-9 pr-4 py-2 text-sm outline-none transition search-input"
        />
      </div>

      {/* Auth */}
      {session ? (
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/profile" className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden shrink-0">
            {session.user?.image ? (
              <img src={session.user.image} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm font-bold text-gray-600">
                {session.user?.name?.[0]?.toUpperCase()}
              </div>
            )}
          </Link>
          <button
            onClick={() => signOut()}
            className="text-sm text-gray-500 hover:text-black transition font-medium"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex gap-2 shrink-0">
          <Link href="/login" className="text-sm font-semibold hover:bg-gray-100 px-4 py-2 rounded-full transition">
            Sign in
          </Link>
          <Link href="/register" className="text-sm font-semibold bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition">
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
}