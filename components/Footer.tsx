import React from "react";
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";

export default function Footer() {
  return (
    <div className="flex flex-col gap-5 divide-y pt-7 pb-2 px-3  text-white bg-gray-500">
      <div className="flex flex-col gap-2 py-1">
        <div className="font-semibold">
          <div>Tukar</div>
          <div>Menukar</div>
        </div>
        <div>Inovasi dan kualitas yang berkelanjutan.</div>
        <div className="flex gap-4 text-3xl text-gray-200">
          <AiFillFacebook className="cursor-pointer" />
          <AiFillInstagram className="cursor-pointer" />
          <AiFillLinkedin className="cursor-pointer" />
          <AiFillGithub className="cursor-pointer" />
        </div>
      </div>
      <div className="text-sm py-2">
        © 2023 Tukar-Menukar. All rights reserved.
      </div>
    </div>
  );
}
