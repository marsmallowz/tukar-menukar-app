import Link from "next/link";
import React from "react";
import ButtonLogout from "./ButtonLogout";
import ProfileNavBar from "./ProfileNavBar";

interface UserEntity {
  currentUser: any | null;
}

export default function NavBar({ currentUser }: UserEntity) {
  return (
    <header className="flex justify-between px-4 py-2 bg-gray-500 items-center">
      <nav>
        <Link href="/" className="text-white font-medium">
          <div>Tukar</div>
          <div>Menukar</div>
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
            <Link href="/register" className="text-gray-200 font-medium">
              Daftar
            </Link>
            <Link
              href="/login"
              className="p-2 bg-white text-gray-900 font-medium"
            >
              Masuk
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
