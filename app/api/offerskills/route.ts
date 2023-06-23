import { NextResponse } from "next/server";

import prisma from "../../../lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import getCurrentUser from "../../actions/getCurrentUser";
import { revalidatePath } from "next/cache";

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
  revalidatePath("/skills");
  console.log("Success add offer skills");

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
    // const skills = await prisma.skill.findMany({
    //   select: {
    //     id: true,
    //     name: true,
    //     description: true,
    //   },
    //   where: {
    //     userOffersIDs: {
    //       hasSome: [user.id],
    //     },
    //   },
    // });

    const myUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        offerSkills: {
          orderBy: {
            id: "asc",
          },
        },
      },
    });

    const mySkills = myUser?.offerSkills;

    mySkills?.sort((a, b) => {
      const indexA = myUser!.offerSkillsIDs.indexOf(a.id);
      const indexB = myUser!.offerSkillsIDs.indexOf(b.id);
      return indexA - indexB;
    });

    return NextResponse.json(mySkills);
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
        offerSkillsIDs: {
          hasSome: [id],
        },
      },
      // include: {
      //   offerSkills: true,
      // },
    });
    // console.log(JSON.stringify(skills, null, 2));

    return NextResponse.json(users);
  }
}

export async function DELETE(request: Request) {
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
        offerSkills: {
          disconnect: {
            id: id,
          },
        },
      },
    }),

    prisma.skill.update({
      where: { id: id },
      data: {
        userOffers: {
          disconnect: {
            id: id,
          },
        },
      },
    }),
  ]);
  revalidatePath("/skills");
  console.log("Success remove offer skills");

  return NextResponse.json({ message: "Success" });
}
