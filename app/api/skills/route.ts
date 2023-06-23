import { NextResponse } from "next/server";

import prisma from "../../../lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import getCurrentUser from "../../actions/getCurrentUser";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, description } = body;

  const skill = await prisma.skill.create({
    data: {
      name: name,
      description: description,
    },
  });

  return NextResponse.json(skill);
}

export async function GET(request: Request) {
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
    const skills = await prisma.skill.findMany();

    return NextResponse.json(skills);
  } else {
    const skill = await prisma.skill.findUnique({
      where: {
        id: id,
      },
    });

    return NextResponse.json(skill);
  }
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const body = await request.json();
  const { name, description } = body;

  if (!id) {
    return NextResponse.json(
      { error: "Bad Request", message: "Id cannot be null" },
      { status: 400 }
    );
  }

  const skill = await prisma.skill.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      description: description,
    },
  });

  return NextResponse.json(skill);
}
