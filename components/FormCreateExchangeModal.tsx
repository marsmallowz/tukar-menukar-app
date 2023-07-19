"use client";

import React, { useRef, useState, useTransition } from "react";
import { createExchange } from "../app/actions/exchangeActions";

export default function FormCreateExchangeModal({ user, currentUser }: any) {
  const formRef = useRef<any>(null);
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);
  const [selectedRequestSkill, setSelectedRequestSkill] = useState("");

  const today = new Date();
  today.setDate(today.getDate() + 1);
  const [dateStarted, setDateStarted] = useState(
    today.toISOString().split("T")[0]
  );

  async function handleCreateExchange(formData: any) {
    const requestedUserId = user.id;
    const dateStarted: string = formData.get("dateStarted");
    const dateEnded: string = formData.get("dateEnded");

    await createExchange({
      requestedUserId,
      skillRequestedId: selectedRequestSkill,
      dateStarted,
      dateEnded,
    });

    await formRef.current.reset();
    setShowModal(false);
  }

  return (
    <div>
      <button
        onClick={() => {
          setShowModal(!showModal);
        }}
        disabled={
          currentUser?.id === undefined ||
          currentUser?.id === user?.id ||
          !user?.offerSkills.length ||
          !user?.requestSkills.length ||
          !currentUser?.offerSkills.length ||
          !currentUser?.requestSkills.length
        }
        className="rounded-md bg-gray-600 p-2 text-md font-semibold text-white shadow-sm hover:bg-gray-500 sm:w-auto disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        Create Exchange
      </button>
      <div className={`${showModal ? "relative" : "hidden"} z-10`}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <form
              action={handleCreateExchange}
              ref={formRef}
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-lg"
            >
              <div className="bg-white p-6 pb-4">
                <h3 className="text-lg font-semibold leading-6 text-gray-900 ">
                  Create Exchange
                </h3>
                <div className="flex flex-col mx-auto gap-2 mt-2">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      From
                    </label>
                    <div className="mt-1 ">
                      <input
                        type="text"
                        defaultValue={currentUser?.username ?? ""}
                        required
                        className="border-2 p-2 w-full"
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      To
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        defaultValue={user.username}
                        required
                        className="border-2 p-2 w-full"
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="requestSkill"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Request Skill
                    </label>
                    <div className="mt-2 bg-slate-100">
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
                        {user?.offerSkills.map((skill: any) => {
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
                  <div>
                    <label
                      htmlFor="dateStarted"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Started Date
                    </label>
                    <div className="mt-2">
                      <input
                        id="dateStarted"
                        name="dateStarted"
                        type="date"
                        min={today.toISOString().split("T")[0]}
                        required
                        onChange={(e) => {
                          console.log(typeof e.target.value);
                          console.log(e.target.value);
                          setDateStarted(e.target.value);
                        }}
                        className="border-2 p-2 w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="dateEnded"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      End Date
                    </label>
                    <div className="mt-2">
                      <input
                        id="dateEnded"
                        name="dateEnded"
                        type="date"
                        min={dateStarted}
                        required
                        className="border-2 p-2 w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 py-3 flex flex-row-reverse px-6">
                <button
                  type="submit"
                  className="mt-3 ml-3 inline-flex w-full justify-center rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 sm:mt-0 sm:w-auto"
                >
                  Create
                </button>
                <button
                  onClick={async () => {
                    setShowModal(!showModal);
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
    </div>
  );
}
