"use server";

import { prisma } from "@/lib/prisma";

export async function getBoards(userId: string) {
  return await prisma.board.findMany({
    where: { userId },
    include: {
      boardPin: {
        take: 3,
        include: { pin: { select: { imageUrl: true } } },
      },
      _count: { select: { boardPin: true } },
    },
  });
}

export async function createBoard(data: { name: string; userId: string }) {
  return await prisma.board.create({ data });
}

export async function getBoardById(id: string) {
  return await prisma.board.findUnique({
    where: { id },
    include: {
      boardPin: {
        include: { pin: { include: { user: true } } },
      },
      user: true,
    },
  });
}