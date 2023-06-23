import { NextResponse } from "next/server";

import prisma from "../../../lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized", message: "Invalid session" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { error: "Bad Request", message: "Id cannot be null" },
      { status: 400 }
    );
  }

  const user = session.user as any;
  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: {
        offerSkillsIDs: { push: id },
      },
    }),
    prisma.skill.update({
      where: { id: id },
      data: {
        userOffersIDs: { push: user.id },
      },
    }),
  ]);
  console.log("Success add request skills");

  return NextResponse.json({ message: "Success" });
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized", message: "Invalid session" },
      { status: 401 }
    );
  }

  const user = session.user as any;
  if (user.id !== null) {
    const skills = await prisma.skill.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
      where: {
        userRequestsIDs: {
          hasSome: [user.id],
        },
      },
    });
    return NextResponse.json(skills);
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { error: "Bad Request", message: "Id cannot be null" },
      { status: 400 }
    );
  }

  if (id !== null) {
    const users = await prisma.user.findMany({
      where: {
        requestSkillsIDs: {
          hasSome: [id],
        },
      },
    });
    return NextResponse.json(users);
  }
}
