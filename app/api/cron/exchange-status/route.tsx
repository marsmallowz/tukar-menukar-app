import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "../../../../lib/prismadb";

export async function GET(request: NextRequest) {
  try {
    const currentDate = new Date();
    await prisma.$transaction(async (prisma) => {
      // const exchanges = await prisma.exchange.findMany();
      await prisma.exchange.updateMany({
        where: {
          status: "PENDING",
          dateStarted: {
            lt: currentDate,
          },
        },
        data: { status: "REJECTED" },
      });
      await prisma.exchange.updateMany({
        where: {
          status: "ACCEPTED",
          dateStarted: {
            gt: currentDate,
          },
        },
        data: { status: "ONPROGRESS" },
      });
      await prisma.exchange.updateMany({
        where: {
          status: "ONPROGRESS",
          dateEnded: {
            gt: currentDate,
          },
        },
        data: { status: "COMPLETED" },
      });
    });
    return NextResponse.json("success");
  } catch (error) {
    console.error("Transaksi gagal:", error);
  } finally {
    await prisma.$disconnect();
  }
}
