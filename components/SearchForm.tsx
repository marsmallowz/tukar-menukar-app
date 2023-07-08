"use client";

import React from "react";
import useCustomeRouter from "../hooks/useCustomRouter";

export default function SearchForm() {
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
          className="p-2 text-sm text-gray-900 border border-gray-300  bg-gray-50 outline-none focus:gray-blue-500 focus:border-gray-500"
          placeholder="Search"
        />
      </div>
      <button
        type="submit"
        className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-sm px-4 py-2"
      >
        Search
      </button>
    </form>
  );
}
