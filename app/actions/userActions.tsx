"use server";

import prisma from "../../lib/prismadb";

export async function getUsers(searchParams: any) {
  const search = searchParams?.search || "";
  const sort = searchParams.sort || "desc";
  const limit = searchParams.limit * 1 || 5;
  const page = searchParams.page * 1 || 1;
  const skip = searchParams.skip * 1 || limit * (page - 1);
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            offerSkills: {
              some: {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      },
      select: {
        id: true,
        username: true,
      },
      skip: skip,
      take: limit,
    });
    const count = await prisma.user.count({
      where: {
        OR: [
          {
            username: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            offerSkills: {
              some: {
                name: {
                  contains: search,
                },
              },
            },
          },
        ],
      },
    });

    const totalPage = Math.ceil(count / limit);
    return { users, totalPage };
  } catch (error: any) {
    console.log({ error: "ada", message: error });
    throw new Error(error);
  }
}

export async function getUser(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        offerSkills: true,
        requestSkills: true,
      },
    });

    return user;
  } catch (error: any) {
    console.log({ error: "ada", message: error });
    throw new Error(error);
  }
}
