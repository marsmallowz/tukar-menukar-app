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
          className="inline-flex w-full justify-center gap-x-1.5  bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          {username}
        </button>
      </div>
      <div
        ref={modalRef}
        className={`${
          showOptions ? "absolute" : "hidden"
        } right-0 z-10 mt-2 w-56 origin-top-right  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
      >
        <div className="py-1">
          <Link
            href="/dashboard"
            onClick={() => {
              setShowOptions(!showOptions);
            }}
            className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm"
          >
            Dashboard
          </Link>
          <Link
            href="/users"
            onClick={() => {
              setShowOptions(!showOptions);
            }}
            className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm"
          >
            Users
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
          <Link
            href="/settings"
            className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm"
          >
            Settings
          </Link>
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
