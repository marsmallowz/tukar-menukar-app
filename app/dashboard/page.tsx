import React from "react";
import { getExchanges } from "../actions/exchangeActions";
import Link from "next/link";
import SortExchanges from "../../components/SortExchanges";
import PaginationNumber from "../../components/PaginationNumber";

export default async function Page({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const { exchanges }: { exchanges: any } = await getExchanges();

  return (
    <div>
      <div className="flex justify-end">
        <Link
          href={"/search"}
          className="p-2 text-white font-medium bg-gray-600 hover:bg-gray-700 cursor-pointer "
        >
          Create Exchange
        </Link>
      </div>
      {exchanges.length ? (
        <div>
          <div className="flex justify-between mt-4 mb-1">
            <h1 className="text-2xl font-bold">My Exchanges</h1>
            <SortExchanges />
          </div>
          <div className="flex flex-col gap-1 mb-4 max-h-[calc(100vh/3)]">
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
        </div>
      ) : null}
      <PaginationNumber totalPages={5} />
    </div>
  );
}
