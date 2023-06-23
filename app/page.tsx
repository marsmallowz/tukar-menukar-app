import React from "react";
import PaginationNumber from "../components/PaginationNumber";
import SearchFormUsers from "../components/SearchFormUsers";
import { getUsers } from "./actions/userActions";
import Link from "next/link";
import { getExchanges } from "./actions/exchangeActions";
import SortExchanges from "../components/SortExchanges";

export default async function Home({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const { users, totalPage }: { users: any; totalPage: number } =
    await getUsers(searchParams);
  const { exchanges }: { exchanges: any } = await getExchanges();

  return (
    <main className="p-2">
      {exchanges.length ? (
        <>
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">My Exchanges</h1>
            <SortExchanges />
          </div>
          <div className="flex flex-col gap-1 min-h-[calc(100vh/1.5)]">
            {exchanges.length ? (
              exchanges.map((exchange: any) => {
                return (
                  <div
                    key={exchange.id}
                    className="flex justify-between items-center"
                  >
                    <div>{exchange.requestedUserId}</div>
                    <Link href={`/exchanges/${exchange.id}`}>See</Link>
                  </div>
                );
              })
            ) : (
              <div>Exchange not found</div>
            )}
          </div>
        </>
      ) : null}
      <h1 className="text-2xl font-bold">Find Users</h1>
      <SearchFormUsers />
      <h1 className="text-xl font-semibold mt-2">User List</h1>
      <h2 className="text-lg font-medium mb-2">Username</h2>
      <div className="flex flex-col gap-1 min-h-[calc(100vh/1.5)]">
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
    </main>
  );
}
