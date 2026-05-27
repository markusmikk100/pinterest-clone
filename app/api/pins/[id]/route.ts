import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { unlink } from "fs/promises";
import { join } from "path";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    console.log("DELETE pin:", id);

    const session = await auth();
    console.log("session:", session?.user?.email);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    console.log("user:", user?.id);

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const pin = await prisma.pin.findUnique({ where: { id } });
    console.log("pin:", pin?.id, "owner:", pin?.userId);

    if (!pin) return NextResponse.json({ error: "Pin not found" }, { status: 404 });
    if (pin.userId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    console.log("Deleting saves...");
    await prisma.save.deleteMany({ where: { pinId: id } });

    console.log("Deleting boardPins...");
    await prisma.boardPin.deleteMany({ where: { pinId: id } });

    console.log("Deleting pin...");
    await prisma.pin.delete({ where: { id } });

    console.log("Done!");

    try {
      const filename = pin.imageUrl.replace("/uploads/", "");
      await unlink(join(process.cwd(), "public", "uploads", filename));
    } catch {}

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete pin error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}