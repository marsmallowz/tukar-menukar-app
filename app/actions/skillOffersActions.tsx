"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/dist/client/components/headers";
import { decode } from "next-auth/jwt";
import prisma from "../../lib/prismadb";
import { Skill } from "@prisma/client";

export async function getAllSkillOffer() {
  try {
    const sessionToken = cookies().get(
      process.env.SESSION_TOKEN_NAME as string
    );
    const decoded = await decode({
      token: sessionToken?.value,
      secret: process.env.NEXTAUTH_SECRET as string,
    });

    if (!decoded?.sub) {
      return { offerSkills: [] };
    }
    const myUser = await prisma.user.findUnique({
      where: {
        id: decoded.sub,
      },
      include: {
        offerSkills: {
          orderBy: {
            id: "asc",
          },
        },
      },
    });
    const offerSkills = myUser!.offerSkills;
    offerSkills.sort((a, b) => {
      const indexA = myUser!.offerSkillsIDs.indexOf(a.id);
      const indexB = myUser!.offerSkillsIDs.indexOf(b.id);
      return indexA - indexB;
    });

    return { offerSkills: offerSkills };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function addSkillOffer(id: string) {
  try {
    const sessionToken = cookies().get(
      process.env.SESSION_TOKEN_NAME as string
    );
    const decoded = await decode({
      token: sessionToken?.value,
      secret: process.env.NEXTAUTH_SECRET as string,
    });

    if (!decoded?.sub) {
      return null;
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: decoded?.sub },
        data: {
          offerSkillsIDs: { push: id },
        },
      }),
      prisma.skill.update({
        where: { id: id },
        data: {
          userOffersIDs: { push: decoded?.sub },
        },
      }),
    ]);
    revalidatePath("/skills");
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function removeSkillOffer(id: string) {
  try {
    const sessionToken = cookies().get(
      process.env.SESSION_TOKEN_NAME as string
    );
    const decoded = await decode({
      token: sessionToken?.value,
      secret: process.env.NEXTAUTH_SECRET as string,
    });

    if (!decoded?.sub) {
      return null;
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: decoded?.sub },
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
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
