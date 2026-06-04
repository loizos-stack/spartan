import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { seedDatabase } from "@/lib/seed";

export async function GET(req: Request) {
  await seedDatabase();

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const level = searchParams.get("level");

  const where: Record<string, unknown> = { published: true };
  if (category && category !== "all") where.category = category;
  if (level && level !== "all") where.level = level;

  const courses = await prisma.course.findMany({
    where,
    include: {
      coach: { select: { name: true, avatar: true } },
    },
    orderBy: { enrollCount: "desc" },
  });

  return NextResponse.json(courses);
}
