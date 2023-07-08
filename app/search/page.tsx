import React from "react";
import Link from "next/link";
import PaginationNumber from "../../components/PaginationNumber";
import SearchForm from "../../components/SearchForm";
import { getSearchUser } from "../actions/searchAction";
import SearchFilter from "../../components/SearchFilter";

export default async function Page({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const { users, totalPage }: { users: any; totalPage: number } =
    await getSearchUser(searchParams);
  return (
    <div>
      {/* <h1 className="text-2xl font-bold mt-4 mb-1">Find Users</h1> */}
      <div className="mb-1 text-sm text-gray-900 font-medium overflow-hidden">
        {searchParams?.filter === "username"
          ? "Filter By Username"
          : searchParams?.filter === "skill"
          ? "Filter By Skill"
          : "Filter By Default"}
      </div>
      <div className="flex gap-2 items-center">
        <SearchForm />
        <SearchFilter />
      </div>
      <h1 className="text-xl font-semibold mt-3 mb-1">List User </h1>
      <div className="flex flex-col gap-1 mb-10 max-h-[calc(100vh/1.6)]">
        {users.length ? (
          users.map((user: any) => {
            return (
              <div key={user.id} className="flex justify-between items-center">
                <div>{user.username}</div>
                <Link href={`/users/${user.id}`}>Visit</Link>
              </div>
            );
          })
        ) : (
          <div>User not found</div>
        )}
      </div>
      <PaginationNumber totalPages={totalPage} />
    </div>
  );
}
