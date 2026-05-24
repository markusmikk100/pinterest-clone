import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(req: Request) {
  try {
    const { data } = await req.json();

    // Strip the base64 header
    const base64 = data.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64, "base64");

    // Generate unique filename
    const filename = `${Date.now()}.jpg`;
    const path = join(process.cwd(), "public", "uploads", filename);

    await writeFile(path, buffer);

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}