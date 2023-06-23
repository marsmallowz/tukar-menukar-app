"use client";
import React from "react";
import { createExchange } from "../app/actions/exchangeActions";

export default function CreateExchangeBtn({ user, currentUser }: any) {
  return (
    <button
      onClick={async () => {
        // await createExchange({
        //   offeredUserId: "waw",
        //   requestedUserId: string,
        //   skillOfferedId: string,
        //   skillRequestedId: string,
        //   dateStarted: string,
        //   dateEnded: string,
        // });
      }}
      disabled={
        currentUser?.id === undefined ||
        currentUser?.id === user?.id ||
        !user?.offerSkills.length ||
        !user?.requestSkills.length ||
        !currentUser?.offerSkills.length ||
        !currentUser?.requestSkills.length
      }
      className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:w-auto disabled:cursor-not-allowed disabled:bg-gray-400"
    >
      Create Exchange
    </button>
  );
}
