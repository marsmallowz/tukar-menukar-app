"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function SortExchanges() {
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
        >
          Sort
        </button>
      </div>
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
            Acsending
          </Link>
          <Link
            href="#"
            onClick={() => {
              setShowOptions(!showOptions);
            }}
            className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm"
          >
            Decsending
          </Link>
        </div>
      </div>
    </div>
  );
}
