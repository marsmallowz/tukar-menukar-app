import Link from "next/link";
import React from "react";

export default function RightSectionNavBar() {
  return (
    <div className="flex space-x-4 items-center">
      <Link href="/register">Daftar</Link>
      <Link href="/login">Masuk</Link>
    </div>
  );
}
{
  /* <div className="flex space-x-4 items-center">
  <div>username</div>
  <div className="bg-white rounded-full w-10 h-10"></div>
</div>; */
}
