import React from "react";
import SearchFormUsers from "../../components/SearchFormUsers";
import { getUsers } from "../actions/userActions";
import Link from "next/link";
import PaginationNumber from "../../components/PaginationNumber";
import SearchForm from "../../components/SearchForm";

export default async function Page({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const { users, totalPage }: { users: any; totalPage: number } =
    await getUsers(searchParams);
  return (
    <div>
      <h1 className="text-2xl font-bold mt-4 mb-1">Find Users</h1>
      <div className="flex gap-2 items-center">
        <SearchForm />
      </div>
      <h1 className="text-xl font-semibold mt-3 mb-1">Result</h1>
      <div className="flex flex-col gap-1 min-h-[calc(100vh/3.5)]">
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
