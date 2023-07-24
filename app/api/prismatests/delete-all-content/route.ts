import { NextApiRequest } from "next";
import prismaExample from "./deletetabletest";

export async function GET(request: Request) {
  const response = await prismaExample();
  return response;
}
