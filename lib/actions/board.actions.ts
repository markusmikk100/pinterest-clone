"use server";

import { prisma } from "@/lib/prisma";

export async function getBoards(userId: string) {
  return await prisma.board.findMany({
    where: { userId },
    include: {
      pins: {
        take: 3,
        select: { imageUrl: true },
      },
      _count: { select: { pins: true } },
    },
  });
}

export async function createBoard(data: {
  name: string;
  userId: string;
}) {
  return await prisma.board.create({ data });
}

export async function getBoardById(id: string) {
  return await prisma.board.findUnique({
    where: { id },
    include: {
      pins: { include: { user: true } },
    },
  });
}