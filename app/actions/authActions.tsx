"use server";

import prisma from "../../lib/prismadb";
import bcrypt from "bcrypt";

export default async function register({
  email,
  username,
  password,
}: {
  email: string;
  username: string;
  password: string;
}) {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        hashedPassword,
      },
    });
    return { id: user.id };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
