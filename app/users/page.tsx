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
      <h1 className="text-2xl font-bold mt-4 mb-1">Find Users</h1>
      <div className="mb-1 text-sm text-gray-900 font-medium overflow-hidden">
        {searchParams?.filter === "email"
          ? "Filter By Email"
          : "Filter By Username"}
      </div>
      <div className="flex gap-2 items-center">
        <SearchForm />
        <SearchFilter />
      </div>
      <h1 className="text-xl font-semibold mt-3 mb-1">List User </h1>
      <div className="flex flex-col gap-1 mb-10 divide-y-2">
        {users.length ? (
          users.map((user: any) => {
            return (
              <div
                key={user.id}
                className="flex py-2 justify-between items-center"
              >
                <div className="flex flex-col">
                  <div className="font-semibold">
                    {searchParams?.filter === "email"
                      ? `${user.email}`
                      : `@${user.username}`}
                  </div>
                  <div className="flex gap-5 text-sm text-gray-500 divide-x-2">
                    <div>Reviewed {user._count.reviewed} </div>
                    <div className="pl-2">
                      Offer Skills {user._count.offerSkills}{" "}
                    </div>
                    <div className="pl-2">
                      Request Skills {user._count.requestSkills}
                    </div>
                  </div>
                </div>
                <Link
                  href={`/users/${user.id}`}
                  className="font-semibold text-gray-500"
                >
                  Visit
                </Link>
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
