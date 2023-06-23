"use client";

import React, { useRef, useState, useTransition } from "react";
import {
  acceptExchange,
  cancelExchange,
  rejectExchange,
} from "../app/actions/exchangeActions";
import { getUser } from "../app/actions/userActions";
import Link from "next/link";

export default function FormAcceptExchangeModal({
  exchange,
  currentUser,
  offerSkills,
}: any) {
  const formRef = useRef<any>(null);
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState("");
  const [selectedOfferedSkill, setSelectedRequestSkill] = useState("");
  async function handleAcceptExchange() {
    await acceptExchange({
      id: exchange.id,
      skillOfferedId: selectedOfferedSkill,
    });

    await formRef.current.reset();
    setShowModal("");
  }

  return (
    <div>
      <div className="flex gap-2">
        {exchange?.status === "PENDING" &&
        currentUser?.id === exchange.requestedUser.id ? (
          <button
            onClick={() => {
              setShowModal("ACCEPT");
            }}
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:w-auto disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Accept
          </button>
        ) : null}
        {exchange?.status === "PENDING" &&
        currentUser?.id === exchange.offeredUser.id ? (
          <button
            onClick={() => {
              setShowModal("CANCEL");
            }}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Cancel
          </button>
        ) : exchange?.status === "PENDING" &&
          currentUser?.id === exchange.requestedUser.id ? (
          <button
            onClick={() => {
              setShowModal("REJECT");
            }}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Reject
          </button>
        ) : null}
      </div>
      <div className={`${showModal === "ACCEPT" ? "relative" : "hidden"} z-10`}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <form
              action={handleAcceptExchange}
              ref={formRef}
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-lg"
            >
              <div className="bg-white p-6 pb-4">
                <h3 className="text-lg font-semibold leading-6 text-gray-900 ">
                  Accept Exchange
                </h3>
                <div className="flex flex-col mx-auto gap-2 mt-2">
                  <div>
                    <label
                      htmlFor="requestSkill"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Offered Skill
                    </label>
                    <div className="mt-2  bg-slate-100">
                      <select
                        id="requestSkill"
                        name="requestSkill"
                        onChange={(e) =>
                          setSelectedRequestSkill(e.target.value)
                        }
                        required
                        className="block w-full px-2 py-3 border-2 text-gray-900 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black-100 "
                      >
                        <option key={""} value={""} className="text-lg">
                          Choose an option
                        </option>
                        {offerSkills.map((skill: any) => {
                          return (
                            <option
                              key={skill.id}
                              value={skill.id}
                              className="text-lg"
                            >
                              {skill.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 py-3 flex flex-row-reverse px-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                  Accept
                </button>
                <button
                  onClick={async () => {
                    setShowModal("");
                    await formRef.current.reset();
                  }}
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        className={`${
          showModal === "REJECT" || showModal === "CANCEL"
            ? "relative"
            : "hidden"
        } z-10`}
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-lg">
              <div className="bg-white p-6 pb-4">
                <h3 className="text-lg font-semibold leading-6 text-gray-900 ">
                  {showModal === "REJECT"
                    ? "Reject Exchange"
                    : showModal === "CANCEL"
                    ? "Cancel Exchange"
                    : null}
                </h3>
                <div className="mt-2">
                  {showModal === "REJECT"
                    ? `Are you sure want to Reject this exchange?`
                    : showModal === "CANCEL"
                    ? `Are you sure want to Cancel this exchange?`
                    : null}
                </div>
              </div>
              <div className="bg-gray-50 py-3 flex flex-row-reverse px-6">
                <button
                  disabled={isPending}
                  onClick={() => {
                    startTransition(() => {
                      if (showModal === "REJECT") {
                        rejectExchange(exchange.id);
                      } else if (showModal === "CANCEL") {
                        cancelExchange(exchange.id);
                      }
                      setShowModal("");
                    });
                  }}
                  className={`inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-400 sm:ml-3 sm:w-auto`}
                >
                  {isPending
                    ? "Loading..."
                    : showModal === "REJECT"
                    ? "Reject"
                    : showModal === "CANCEL"
                    ? "Cancel"
                    : null}
                </button>
                <button
                  onClick={async () => {
                    startTransition(() => {
                      setShowModal("");
                    });
                  }}
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
