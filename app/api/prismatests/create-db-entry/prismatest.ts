import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export default async function prismaExample(planner: string) {
  console.log("hi");
  const newPlan = await prisma.plan.create({
    data: {
      plan: planner,
    },
  });
  console.log(newPlan);
  return newPlan;
  //console.log(newUser);
  //const plans = await prisma.plan.findMany();
}
