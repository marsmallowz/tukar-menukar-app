import React from "react";
import { getExchanges } from "../actions/exchangeActions";
import Link from "next/link";
import SortExchanges from "../../components/SortExchanges";
import PaginationNumber from "../../components/PaginationNumber";
import { MdChevronRight } from "react-icons/md";

export default async function Page({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const { exchanges, totalPage }: { exchanges: any; totalPage: number } =
    await getExchanges(searchParams);

  return (
    <div>
      <div className="flex justify-end">
        <Link
          href={"/users"}
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
          {/* max-h-[calc(100vh/3)] */}
          <ul className="divide-y-2 divide-gray-200 gap-1 mb-4">
            {exchanges.length ? (
              exchanges.map((exchange: any) => {
                return (
                  <li
                    key={exchange.id}
                    className="flex py-4 justify-between items-center"
                  >
                    <div className="flex flex-col">
                      <div>id: {exchange.id}</div>
                      <div>
                        {exchange.skillRequested?.name} -{" "}
                        {exchange.skillOffered?.name ?? "Not set yet"}
                      </div>
                      <div>status: {exchange.status}</div>
                    </div>
                    <Link href={`/exchanges/${exchange.id}`}>
                      <MdChevronRight />
                    </Link>
                  </li>
                );
              })
            ) : (
              <div>Exchange not found</div>
            )}
          </ul>
        </div>
      ) : null}
      <PaginationNumber totalPages={totalPage} />
    </div>
  );
}
