"use server";

import { User } from "@prisma/client";
import prisma from "../../lib/prismadb";
import jwt from "jsonwebtoken";

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
      select: {
        id: true,
        email: true,
        username: true,
        profileImage: true,
        offerSkills: true,
        requestSkills: true,
        reviewed: {
          include: {
            skill: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    const exchange = await prisma.exchange.findMany({
      where: {
        OR: [
          {
            offeredUserId: user?.id,
          },
          {
            requestedUserId: user?.id,
          },
        ],
      },
    });

    const calculateAverageRating = function calculateAverageRating(
      reviewed: any
    ) {
      let totalRating = 0;

      for (let i = 0; i < reviewed.length; i++) {
        totalRating += reviewed[i].rating;
      }

      if (reviewed.length > 0) {
        const averageRating = totalRating / reviewed.length;
        return averageRating;
      } else {
        return 0.0;
      }
    };

    const userRating = calculateAverageRating(user?.reviewed);
    return { user, userRating, exchange };
  } catch (error: any) {
    console.log({ error: "ada", message: error });
    throw new Error(error);
  }
}

export async function getUserFromToken(token: string) {
  try {
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    if (!decodedToken.email || !decodedToken.username) {
      throw new Error("Token Invalid");
    }
    const user = await prisma.user.findFirst({
      where: {
        email: decodedToken.email,
        username: decodedToken.username,
        token: {
          isSet: true,
        },
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    return user;
  } catch (error: any) {
    console.log(error);

    return null;
  }
}
