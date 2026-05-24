import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, imageUrl } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const pin = await prisma.pin.create({
      data: { title, description, imageUrl, userId: user.id },
    });

    return NextResponse.json(pin);
  } catch (error) {
    console.error("Pin create error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}