"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function ProfileNavBar({ username }: { username: string }) {
  const modalRef = useRef<any>(null);

  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => {
            setShowOptions(!showOptions);
          }}
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          {username}
        </button>
      </div>

      {/* <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  --> */}
      <div
        ref={modalRef}
        className={`${
          showOptions ? "absolute" : "hidden"
        } right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
      >
        <div className="py-1">
          <Link
            href="#"
            className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm"
          >
            Account settings
          </Link>
          <Link
            href="/skills"
            onClick={() => {
              setShowOptions(!showOptions);
            }}
            className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm"
          >
            Skills
          </Link>
          {/* <button
            onClick={() => {
              setShowOptions(!showOptions);
              router.push("/skills");
            }}
            className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block w-full px-4 py-2 text-left text-sm"
          >
            Skills
          </button> */}
          <button
            type="button"
            onClick={() => {
              signOut();
            }}
            className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block w-full px-4 py-2 text-left text-sm"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
