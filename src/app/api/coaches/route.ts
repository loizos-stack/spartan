import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { seedDatabase } from "@/lib/seed";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
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
  } catch (e) {
    console.error("Coaches API error:", e);
    return NextResponse.json([]);
  }
}
