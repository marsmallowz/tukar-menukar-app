"use client";

import React from "react";
import useCustomeRouter from "../hooks/useCustomRouter";

export default function SearchFormUsers() {
  const { pushQuery, query } = useCustomeRouter();

  async function handleSearch(formdata: any) {
    const search = formdata.get("search");
    pushQuery({ search: search });
  }

  return (
    <form action={handleSearch} className="flex gap-2">
      <div className="flex items-center gap-2">
        <input
          type="search"
          name="search"
          className="p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Users"
        />
      </div>
      <button
        type="submit"
        className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
      >
        Search
      </button>
    </form>
  );
}
