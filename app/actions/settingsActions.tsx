"use server";

import path from "path";
import fs from "fs/promises";
import { randomUUID } from "crypto";
import os from "os";
import { v2 as cloudinary } from "cloudinary";
import { cookies } from "next/dist/client/components/headers";
import { decode } from "next-auth/jwt";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// jila type formData didefinisikan FormData malah menyebabkan error
async function savePhotoToLocal(formData: any) {
  const profileImage = formData.get("profileImage");
  return await profileImage.arrayBuffer().then((data: any) => {
    const buffer = Buffer.from(data);
    const name = randomUUID();
    const ext = profileImage.type.split("/")[1];
    const tempDir = os.tmpdir();
    const uploadDir = path.join(tempDir, `/${name}.${ext}`);
    fs.writeFile(uploadDir, buffer);
    return { filepath: uploadDir, filename: profileImage.name };
  });

  // not work in vercel
  // const uploadDir = path.join(process.cwd(), "public", `/${name}.${ext}`);
  // fs.writeFile(uploadDir, buffer);
}

export async function uploadPhoto(formData: FormData) {
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

    const user = await prisma?.user.findUnique({
      where: {
        id: decoded?.sub,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const username = formData.get("username");
    const profileImage = formData.get("profileImage");

    if (username !== null && (username as string) !== user.username) {
      await prisma?.user.update({
        where: {
          id: user.id,
        },
        data: {
          username: username as string,
        },
      });
    }

    if (profileImage !== null) {
      const newFile = await savePhotoToLocal(formData);

      if (newFile) {
        const res = await cloudinary.uploader.upload(newFile.filepath, {
          folder: "nextjs_upload",
        });

        await prisma?.user.update({
          where: {
            id: user.id,
          },
          data: {
            profileImageId: res.public_id,
            profileImage: res.secure_url,
          },
        });

        if (user.profileImageId !== null) {
          await cloudinary.uploader.destroy(user.profileImageId);
        }

        fs.unlink(newFile.filepath);
      }
    }
    revalidatePath("/settings");
    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "failed" };
  }
}

export async function checkUsername(username: string) {
  try {
    const user = await prisma?.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) {
      return { available: true };
    }
    return { available: false };
  } catch (error) {
    console.log(error);
    return { available: false };
  }
}
