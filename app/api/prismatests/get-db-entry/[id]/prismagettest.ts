import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function prismaExample(id: number) {
  const plan = await prisma.plan.findFirst({
    where: {
      id: id,
    },
  });
  return plan;
}
