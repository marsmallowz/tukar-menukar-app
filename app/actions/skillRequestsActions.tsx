"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/dist/client/components/headers";
import { decode } from "next-auth/jwt";
import prisma from "../../lib/prismadb";

export async function getAllSkillRequest() {
  try {
    const sessionToken = cookies().get(
      process.env.SESSION_TOKEN_NAME as string
    );
    const decoded = await decode({
      token: sessionToken?.value,
      secret: process.env.NEXTAUTH_SECRET as string,
    });

    if (!decoded?.sub) {
      return { requestSkills: [] };
    }
    const myUser = await prisma.user.findUnique({
      where: {
        id: decoded.sub,
      },
      include: {
        requestSkills: true,
      },
    });

    const requestSkills = myUser!.requestSkills;
    requestSkills.sort((a, b) => {
      const indexA = myUser!.requestSkillsIDs.indexOf(a.id);
      const indexB = myUser!.requestSkillsIDs.indexOf(b.id);
      return indexA - indexB;
    });

    return { requestSkills: requestSkills };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function addSkillRequest(id: string) {
  try {
    const sessionToken = cookies().get(
      process.env.SESSION_TOKEN_NAME as string
    );
    const decoded = await decode({
      token: sessionToken?.value,
      secret: process.env.NEXTAUTH_SECRET as string,
    });

    if (!decoded?.sub) {
      throw new Error("Invalid certification");
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: decoded?.sub },
        data: {
          requestSkillsIDs: { push: id },
        },
      }),
      prisma.skill.update({
        where: { id: id },
        data: {
          userRequestsIDs: { push: decoded?.sub },
        },
      }),
    ]);
    revalidatePath("/skills");
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function removeSkillRequest(id: string) {
  try {
    const sessionToken = cookies().get(
      process.env.SESSION_TOKEN_NAME as string
    );
    const decoded = await decode({
      token: sessionToken?.value,
      secret: process.env.NEXTAUTH_SECRET as string,
    });

    if (!decoded?.sub) {
      throw new Error("Invalid certification");
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: decoded?.sub },
        data: {
          requestSkills: {
            disconnect: {
              id: id,
            },
          },
        },
      }),

      prisma.skill.update({
        where: { id: id },
        data: {
          userRequests: {
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
