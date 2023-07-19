"use server";

import prisma from "../../lib/prismadb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register({
  email,
  username,
}: {
  email: string;
  username: string;
}) {
  try {
    const token = await jwt.sign(
      { email, username },
      process.env.TOKEN_SECRET!,
      {
        expiresIn: "30d",
      }
    );

    const user = await prisma.user.create({
      data: {
        email,
        username,
        token,
      },
    });

    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const websiteLink = `${process.env.WEB_URL}verify?token=${token}`;
    const newTabLink = `<a href="${websiteLink}" target="_blank">disini</a>`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      // to: "alsandymaulana@gmail.com",
      subject: "Tukar-Menukar App | Verification account ",
      html: `Halo ${username},<br><br>untuk verfikasi silahkan klik ${newTabLink}.<br><br>Terima kasih!`,
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          console.log("Email sent: " + info.response);
          resolve(info);
        }
      });
    });

    // await transporter.sendMail(mailOptions, function (error: any, info: any) {
    //   if (error) {
    //     throw new Error(error);
    //   } else {
    //     console.log("Email sent: " + info.response);
    //   }
    // });
    return { id: user.id };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function setPassword({
  token,
  password,
  confirmPassword,
}: {
  token: string;
  password: string;
  confirmPassword: string;
}) {
  try {
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    if (!decodedToken.email) {
      throw new Error("Token Invalid");
    }
    if (password !== confirmPassword) {
      throw new Error("Password Invalid");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.findFirst({
      where: {
        email: decodedToken.email,
        username: decodedToken.username,
      },
    });

    if (user?.token !== token) {
      throw new Error("Token not found");
    }

    await prisma.user.update({
      where: {
        email: decodedToken.email,
      },
      data: {
        hashedPassword,
        token: { unset: true },
      },
    });

    return { id: user.id };
  } catch (error: any) {
    console.log(error);

    return null;
  }
}
