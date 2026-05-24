"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/navbar";
import { ImagePlus } from "lucide-react";

export default function CreatePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!image || !title || !session?.user?.email) return;

    setLoading(true);
    setError("");

    try {
      // Upload image
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: image }),
      });

      const { url } = await uploadRes.json();

      // Create pin
      const pinRes = await fetch("/api/pins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, imageUrl: url }),
      });

      if (!pinRes.ok) throw new Error("Failed to create pin");

      router.push("/");
    } catch (err) {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <main>
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 pt-10">
        <h1 className="text-2xl font-bold mb-8">Create Pin</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Image Upload */}
          <label className="cursor-pointer">
            <div className="border-2 border-dashed border-gray-300 rounded-2xl overflow-hidden flex items-center justify-center bg-gray-50 min-h-64 hover:bg-gray-100 transition">
              {image ? (
                <img src={image} className="w-full object-cover rounded-2xl" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400 p-10">
                  <ImagePlus className="w-10 h-10" />
                  <p className="text-sm font-medium">Click to upload image</p>
                  <p className="text-xs">PNG, JPG, WEBP</p>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>

          {/* Title */}
          <input
            type="text"
            placeholder="Add a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 font-semibold"
          />

          {/* Description */}
          <textarea
            placeholder="Add a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 resize-none"
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading || !image || !title}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish Pin"}
          </button>
        </form>
      </div>
    </main>
  );
}