import Link from "next/link";
import React from "react";
import ButtonLogout from "./ButtonLogout";
import ProfileNavBar from "./ProfileNavBar";

interface UserEntity {
  currentUser: any | null;
}

export default function NavBar({ currentUser }: UserEntity) {
  return (
    <header className="flex justify-between px-4 py-2 bg-gray-400 items-center">
      <nav>
        <Link href="/" className="text-white font-medium">
          Tukar-Menukar
        </Link>
      </nav>
      <div className="flex space-x-4 items-center h-10">
        {currentUser !== null ? (
          <>
            <ProfileNavBar username={currentUser.username} />
            {/* <ButtonLogout /> */}
          </>
        ) : (
          <>
            <Link href="/register">Daftar</Link>
            <Link href="/login">Masuk</Link>
          </>
        )}
      </div>
    </header>
  );
}
