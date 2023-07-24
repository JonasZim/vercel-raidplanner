import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import prismaExample from "./prismaupdatetest";

export async function PUT(
  request: NextApiRequest,
  context: { params: { id: string } }
) {
  const id = parseInt(context.params.id); // '1'
  const body = await request.json();
  const response = await prismaExample(id, body.plan);
  return NextResponse.json(response, { status: 200 });
}
