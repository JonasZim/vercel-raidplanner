import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export default async function prismaExample(id: number, newPlanner: string) {
  const plan = await prisma.plan.update({
    where: {
      id: id,
    },
    data: {
      plan: newPlanner,
    },
  });
  return plan;
}
