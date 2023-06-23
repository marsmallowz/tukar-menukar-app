"use server";

import prisma from "../../lib/prismadb";
import { cookies } from "next/dist/client/components/headers";
import { decode } from "next-auth/jwt";
import { revalidatePath } from "next/cache";

export async function createExchange({
  requestedUserId,
  skillRequestedId,
  dateStarted,
  dateEnded,
}: {
  requestedUserId: string;
  skillRequestedId: string;
  dateStarted: string;
  dateEnded: string;
}): Promise<any> {
  try {
    const sessionToken = cookies().get("next-auth.session-token");
    const decoded = await decode({
      token: sessionToken?.value,
      secret: process.env.NEXTAUTH_SECRET as string,
    });

    if (!decoded?.sub) {
      throw new Error("Invalid certification");
    }

    const exchange = await prisma.exchange.create({
      data: {
        offeredUserId: decoded.sub,
        requestedUserId: requestedUserId,
        skillRequestedId: skillRequestedId,
        dateStarted: new Date(dateStarted),
        dateEnded: new Date(dateEnded),
      },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getExchanges(): Promise<any> {
  try {
    const sessionToken = cookies().get("next-auth.session-token");
    const decoded = await decode({
      token: sessionToken?.value,
      secret: process.env.NEXTAUTH_SECRET as string,
    });

    if (!decoded?.sub) {
      // throw new Error("Invalid certification");
      return { exchanges: [] };
    }

    const exchanges = await prisma.exchange.findMany({
      where: {
        OR: [
          {
            offeredUserId: decoded.sub,
          },
          {
            requestedUserId: decoded.sub,
          },
        ],
      },
    });
    return { exchanges };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getExchange(id: string) {
  try {
    const exchange = await prisma.exchange.findUnique({
      where: {
        id: id,
      },
      include: {
        offeredUser: {
          select: {
            id: true,
            username: true,
          },
        },
        requestedUser: {
          select: {
            id: true,
            username: true,
          },
        },
        skillOffered: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        skillRequested: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        reviews: true,
      },
    });

    return exchange;
  } catch (error: any) {
    console.log({ error: "ada", message: error });
    throw new Error(error);
  }
}

export async function acceptExchange({
  id,
  skillOfferedId,
}: {
  id: string;
  skillOfferedId: string;
}) {
  try {
    const findExchanged = await prisma.exchange.findUnique({
      where: {
        id: id,
      },
    });

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const date = currentDate.getDate();
    const date1 = new Date(`${year}-${month}-${date}`);
    const date2 = findExchanged!.dateStarted;

    await prisma.exchange.update({
      where: {
        id: id,
      },
      data: {
        skillOfferedId: skillOfferedId,
        status: date1 > date2 ? "ONPROGRESS" : "ACCEPTED",
      },
    });
    revalidatePath(`/exchanges/${id}`);
  } catch (error: any) {
    console.log({ error: "ada", message: error });
    throw new Error(error);
  }
}

export async function rejectExchange(id: string) {
  try {
    await prisma.exchange.update({
      where: {
        id: id,
      },
      data: {
        status: "REJECTED",
      },
    });
    revalidatePath(`/exchanges/${id}`);
  } catch (error: any) {
    console.log({ error: "ada", message: error });
    throw new Error(error);
  }
}

export async function cancelExchange(id: string) {
  try {
    await prisma.exchange.update({
      where: {
        id: id,
      },
      data: {
        status: "CANCELED",
      },
    });
    revalidatePath(`/exchanges/${id}`);
  } catch (error: any) {
    console.log({ error: "ada", message: error });
    throw new Error(error);
  }
}

// export async function updateSkill({
//   id,
//   name,
//   description,
// }: {
//   id: string;
//   name: string;
//   description: string;
// }): Promise<any> {
//   try {
//     const skill = await prisma.skill.update({
//       where: { id },
//       data: { name, description },
//     });
//     revalidatePath("/admin/skills");
//     return skill;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// }

// export async function deleteSkill(id: string): Promise<any> {
//   try {
//     const skill = await prisma.skill.delete({
//       where: { id },
//     });
//     revalidatePath("/admin/skills");
//     return skill;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// }
