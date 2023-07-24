import { NextApiRequest, NextApiResponse } from "next";
import prismaExample from "./prismatest";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};

export async function POST(req: Request, res: NextApiResponse) {
  if (req.method === "POST") {
    const body = await req.json();
    const foo = await prismaExample(body.plan);
    return NextResponse.json(foo, { status: 200 });
  } else {
    console.log("Method not allowed");
    res.status(405).json({ message: "Method not allowed" });
  }
}
