"use server";

import prisma from "../../lib/prismadb";

export async function getSearchUser(searchParams: any) {
  const search = searchParams?.search || "";
  const sort = searchParams.sort || "desc";
  const filter = searchParams?.filter || "username";
  const limit = searchParams.limit * 1 || 6;
  const page = searchParams.page * 1 || 1;
  const skip = searchParams.skip * 1 || limit * (page - 1);
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            ...(filter === "username"
              ? { username: { contains: search, mode: "insensitive" } }
              : {}),
          },
          {
            ...(filter === "email"
              ? { email: { contains: search, mode: "insensitive" } }
              : {}),
          },
        ],
      },
      select: {
        id: true,
        username: true,
        email: true,
        _count: {
          select: {
            offerSkills: true,
            requestSkills: true,
            reviewed: true,
          },
        },
      },
      skip: skip,
      take: limit,
    });

    const count = await prisma.user.count({
      where: {
        OR: [
          {
            ...(filter === "username" || filter === ""
              ? { username: { contains: search, mode: "insensitive" } }
              : {}),
          },
          {
            ...(filter === "skill" || filter === ""
              ? {
                  offerSkills: {
                    some: {
                      name: {
                        contains: search,
                        mode: "insensitive",
                      },
                    },
                  },
                }
              : {}),
          },
          {
            ...(filter === "skill" || filter === ""
              ? {
                  requestSkills: {
                    some: {
                      name: {
                        contains: search,
                        mode: "insensitive",
                      },
                    },
                  },
                }
              : {}),
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
