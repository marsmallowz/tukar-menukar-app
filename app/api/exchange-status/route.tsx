import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function GET(request: NextRequest) {
  console.log("cronjob");

  return NextResponse.json("success");
}
