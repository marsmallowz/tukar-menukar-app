"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../lib/prismadb";

export async function getAllSkills(searchParams: any) {
  const search = searchParams?.search || "";
  const sort = searchParams.sort || "desc";
  const limit = searchParams.limit * 1 || 5;
  const page = searchParams.page * 1 || 1;
  const skip = searchParams.skip * 1 || limit * (page - 1);
  try {
    const skills = await prisma.skill.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      skip: skip,
      take: limit,
    });
    const count = await prisma.skill.count({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    });

    const totalPage = Math.ceil(count / limit);

    return { skills, count, totalPage };
  } catch (error: any) {
    console.log({ error: "ada", message: error });
    throw new Error(error);
  }
}

export async function createSkill({
  name,
  description,
}: {
  name: string;
  description: string;
}): Promise<any> {
  try {
    const skill = await prisma.skill.create({
      data: {
        name: name,
        description: description,
      },
    });
    revalidatePath("/admin/skills");
    return skill;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function updateSkill({
  id,
  name,
  description,
}: {
  id: string;
  name: string;
  description: string;
}): Promise<any> {
  try {
    const skill = await prisma.skill.update({
      where: { id },
      data: { name, description },
    });
    revalidatePath("/admin/skills");
    return skill;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function deleteSkill(id: string): Promise<any> {
  try {
    const skill = await prisma.skill.delete({
      where: { id },
    });
    revalidatePath("/admin/skills");
    return skill;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
