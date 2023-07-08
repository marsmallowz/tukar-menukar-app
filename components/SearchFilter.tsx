"use client";

import React, { useEffect, useRef, useState } from "react";
import useCustomeRouter from "../hooks/useCustomRouter";

export default function SearchFilter() {
  const modalRef = useRef<any>(null);
  const [showOptions, setShowOptions] = useState(false);
  const { pushQuery, query } = useCustomeRouter();

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
          className="text-gray-900 bg-white border box-border border-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium  text-sm px-4 py-2"
          onClick={() => {
            setShowOptions(!showOptions);
          }}
        >
          Filter
        </button>
      </div>
      <div
        ref={modalRef}
        className={`${
          showOptions ? "absolute" : "hidden"
        } right-0 z-10 mt-2 w-56 origin-top-right  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
      >
        <div className="py-1">
          <div
            onClick={() => {
              pushQuery({ filter: "" });
              setShowOptions(false);
            }}
            className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm cursor-pointer"
          >
            Default
          </div>
          <div
            onClick={() => {
              pushQuery({ filter: "username" });
              setShowOptions(false);
            }}
            className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm cursor-pointer"
          >
            Username
          </div>
          <div
            onClick={() => {
              pushQuery({ filter: "skill" });
              setShowOptions(false);
            }}
            className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm cursor-pointer"
          >
            Skill
          </div>
        </div>
      </div>
    </div>
  );
}
