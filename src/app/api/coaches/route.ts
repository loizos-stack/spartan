import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { seedDatabase } from "@/lib/seed";

export async function GET() {
  await seedDatabase();

  const coaches = await prisma.coach.findMany({
    include: {
      courses: {
        select: { id: true, title: true, enrollCount: true, rating: true },
        where: { published: true },
      },
    },
    orderBy: { featured: "desc" },
  });

  return NextResponse.json(coaches);
}
