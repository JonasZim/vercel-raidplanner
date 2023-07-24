import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export default async function prismaExample() {
  const plan = await prisma.plan.deleteMany({});

  //console.log(plan);
  return NextResponse.json({ plan }, { status: 200 });
}
