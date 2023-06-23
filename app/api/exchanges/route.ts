import { NextResponse } from "next/server";

import prisma from "../../../lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json(
  //     { error: "Unauthorized", message: "Invalid session" },
  //     { status: 401 }
  //   );
  // }
  // const user = session.user as any;

  const createExchange = await prisma.exchange.create({
    data: {
      dateStarted: new Date(),
      dateEnded: new Date(),
      skillOfferedId: "64783b3cf3476473b55656c0",
      skillRequestedId: "64783b3cf3476473b55656c1",
      offeredUserId: "647dd7308acb5bcd5830e7c5",
      requestedUserId: "647dd7308acb5bcd5830e7c6",
    },
  });

  return NextResponse.json(createExchange);
}

export async function GET(request: Request) {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json(
  //     { error: "Unauthorized", message: "Invalid session" },
  //     { status: 401 }
  //   );
  // }

  // const { searchParams } = new URL(request.url);
  // const id = searchParams.get("id");
  // if (!id) {
  //   return NextResponse.json(
  //     { error: "Bad Request", message: "Id cannot be null" },
  //     { status: 400 }
  //   );
  // }

  const users = await prisma.exchange.findMany({
    where: {
      offeredUserId: "647dd7308acb5bcd5830e7c5",
    },
    include: {
      requestedUser: true,
    },
  });

  return NextResponse.json(users);
}
