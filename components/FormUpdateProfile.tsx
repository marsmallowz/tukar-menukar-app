"use client";

import React, { ChangeEvent, useRef, useState } from "react";
import { uploadPhoto } from "../app/actions/settingsActions";
import Image from "next/image";

export default function FormUpdateProfile({
  currentUser,
}: {
  currentUser: any;
}) {
  const formRef = useRef<any>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<File | null>(null);
  const [statusUpdate, setStatusUpdate] = useState("");
  const [isFileError, setIsFileError] = useState("");
  async function handeleInputImage(
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    const files = e.target.files;
    console.log(files);
    if (
      files !== null &&
      files[0].size < 1024 * 1024 &&
      files[0].type.startsWith("image/")
    ) {
      setImage(files[0]);
    } else {
      alert("File not image or to large");
    }
  }
  async function handleUpload(formData: FormData) {
    const username = formData.get("username");
    if (image === null && (username as string) === currentUser.username) {
      alert("Tidak ada update");
      return;
    }

    if (image !== null) {
      formData.append("profileImage", image);
    }
    const res = await uploadPhoto(formData);
    if (res.status === "success") {
      alert("Update Berhasil");
    } else {
      alert("Update Gagal");
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="text-2xl font-bold">Update Profile</div>
      <div className="relative flex flex-col items-center w-40 h-40 sm:w-52 sm:h-52 rounded-full tracking-wide cursor-pointer ">
        <Image
          src={
            image !== null
              ? URL.createObjectURL(image)
              : currentUser?.profileImage !== null
              ? currentUser?.profileImage
              : "/profile-image-default.png"
          }
          alt="profile image"
          width={300}
          height={300}
          className="rounded-full cursor-pointer w-full h-full object-cover"
        />
        <div
          onClick={() => {
            fileInputRef.current?.click();
          }}
          className="absolute inset-0 flex items-center justify-center rounded-full bg-gray-500 bg-opacity-75 text-white text-sm font-semibold opacity-0 transition-opacity duration-300"
        >
          Change Image
        </div>
        {/* Belum Paham */}
        <style jsx>{`
          .relative:hover .absolute {
            opacity: 1;
          }
        `}</style>
      </div>

      <form action={handleUpload} ref={formRef} className="flex flex-col gap-3">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handeleInputImage}
          className="hidden"
        />
        <div className="flex gap-2">
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            defaultValue={currentUser?.username}
            required
            className="border-2 p-2 w-3/4"
          />
          <input
            type="button"
            value={"Check"}
            className="w-1/4 text-white p-2 border-2 bg-gray-500 hover:bg-gray-600 cursor-pointer"
          />
        </div>
        <input
          type="submit"
          value={"Update"}
          className="text-white p-2 bg-gray-500 hover:bg-gray-600 cursor-pointer"
        />
      </form>
      <button className="text-white p-2 bg-gray-500 hover:bg-gray-600">
        Change Password
      </button>
      {/* {image && (
        <Image
          src={
            image !== null
              ? URL.createObjectURL(image)
              : "/profile-image-default.png"
          }
          alt="profile image"
          width={200}
          height={200}
        />
      )} */}
    </div>
  );
}
