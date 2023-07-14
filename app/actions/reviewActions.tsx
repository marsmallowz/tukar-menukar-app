"use server";

import { cookies } from "next/dist/client/components/headers";
import prisma from "../../lib/prismadb";
import { decode } from "next-auth/jwt";

export default async function createReview({
  exchangeId,
  rating,
  comment,
}: {
  exchangeId: string;
  rating: number;
  comment: string;
}) {
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

    const exchange = await prisma.exchange.findFirst({
      where: { id: exchangeId, status: "COMPLETED" },
    });

    if (!exchange) {
      throw new Error("Exchange not found");
    }
    if (exchange.skillOfferedId === null) {
      throw new Error("Something wrong with this exchange");
    }

    const review = await prisma.review.create({
      data: {
        exchangeId: exchangeId,
        reviewId: decoded.sub,
        reviewedId:
          decoded.sub === exchange.requestedUserId
            ? exchange.offeredUserId
            : exchange.requestedUserId,
        skillId:
          decoded.sub === exchange.requestedUserId
            ? exchange.skillOfferedId
            : exchange.skillRequestedId,
        rating: rating,
        comment: comment,
      },
    });
    console.log(review);
    return review;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
}
