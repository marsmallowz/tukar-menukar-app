"use client";

import React, { useTransition } from "react";
import { useSkillModalContext } from "../context/SkillModalProvider";
import {
  addSkillOffer,
  removeSkillOffer,
} from "../app/actions/skillOffersActions";
import {
  addSkillRequest,
  removeSkillRequest,
} from "../app/actions/skillRequestsActions";

export default function ModalAlertSkill() {
  const [isPending, startTransition] = useTransition();
  const { skill, setSkill, setMode, mode } = useSkillModalContext();

  return (
    <div className={`${mode ? "relative" : "hidden"} z-10`}>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-lg">
            <div className="bg-white p-6 pb-4">
              <h3 className="text-lg font-semibold leading-6 text-gray-900 ">
                {mode === "AddOffer"
                  ? "Add Offer Skill"
                  : mode === "RemoveOffer"
                  ? "Remove Offer Skill"
                  : mode === "AddRequest"
                  ? "Add Request Skill"
                  : mode === "RemoveRequest"
                  ? "Remove Request Skill"
                  : null}
              </h3>
              <div className="mt-2">
                {mode === "AddOffer"
                  ? `Are you sure want to Add Offer (${skill?.name}) skill?`
                  : mode === "RemoveOffer"
                  ? `Are you sure want to Remove Offer (${skill?.name}) skill?`
                  : mode === "AddRequest"
                  ? `Are you sure want to Add Request (${skill?.name}) skill?`
                  : mode === "RemoveRequest"
                  ? `Are you sure want to Remove Request (${skill?.name}) skill?`
                  : null}
              </div>
            </div>
            <div className="bg-gray-50 py-3 flex flex-row-reverse px-6">
              <button
                type="button"
                disabled={isPending}
                onClick={() => {
                  startTransition(() => {
                    if (mode === "AddOffer") {
                      addSkillOffer(skill.id);
                    } else if (mode === "RemoveOffer") {
                      removeSkillOffer(skill.id);
                    } else if (mode === "AddRequest") {
                      addSkillRequest(skill.id);
                    } else if (mode === "RemoveRequest") {
                      removeSkillRequest(skill.id);
                    }
                    setMode("");
                    setSkill(null);
                  });
                }}
                className={`inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-400 sm:ml-3 sm:w-auto`}
              >
                {isPending
                  ? "Loading..."
                  : mode === "AddOffer" || mode === "AddRequest"
                  ? "Add"
                  : mode === "RemoveOffer" || mode === "RemoveRequest"
                  ? "Remove"
                  : null}
              </button>
              <button
                onClick={async () => {
                  startTransition(() => {
                    setMode("");
                    setSkill(null);
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
  );
}
