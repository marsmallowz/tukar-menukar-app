import { NextResponse } from "next/server";

export async function POST(request: Request) {
  return NextResponse.json("post user");
}

export async function GET(request: Request, response: Response) {
  return NextResponse.json("get user");
}
