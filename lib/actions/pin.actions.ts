"use server";

import { prisma } from "@/lib/prisma";

export async function getPins() {
  return await prisma.pin.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function createPin(data: {
  title: string;
  imageUrl: string;
  description?: string;
  userId: string;
}) {
  return await prisma.pin.create({ data });
}