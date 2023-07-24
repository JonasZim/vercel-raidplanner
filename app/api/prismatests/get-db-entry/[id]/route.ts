import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

import prismaExample from "./prismagettest";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const id = parseInt(context.params.id);
  console.log(id);
  const response = await prismaExample(id);
  return NextResponse.json(response, { status: 200 });
}
