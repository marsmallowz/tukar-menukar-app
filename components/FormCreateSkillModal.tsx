"use client";

import React, { useRef, useTransition } from "react";
import {
  createSkill,
  deleteSkill,
  updateSkill,
} from "../app/actions/skillActions";
import { useMyContext } from "../context/Provider";

export default function FormCreateSkillModal() {
  const formRef = useRef<any>(null);
  const [isPending, startTransition] = useTransition();

  const {
    editSkill,
    setEditSkill,
    showDialog,
    setShowDialog,
    showDeleteModal,
    setShowDeleteModal,
  } = useMyContext();

  async function handleCreateSkill(formData: any) {
    const name = formData.get("name");
    const description = formData.get("description");

    if (editSkill === null) {
      await createSkill({ name, description });
    } else {
      await updateSkill({
        id: editSkill.id,
        name: name,
        description: description,
      });
    }
    await formRef.current.reset();
    setShowDialog(false);
    setEditSkill(null);
  }

  async function handleDeleteSkill(id: string) {
    await deleteSkill(id);
    setShowDeleteModal(false);
    setEditSkill(null);
  }

  return (
    <div>
      <button
        onClick={() => {
          setShowDialog(!showDialog);
        }}
        className="flex items-center py-2 px-3  text-sm bg-slate-300 rounded-md font-medium"
      >
        Create Skill
      </button>
      <div className={`${showDialog ? "relative" : "hidden"} z-10`}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <form
              action={handleCreateSkill}
              ref={formRef}
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-lg"
            >
              <div className="bg-white p-6 pb-4">
                <h3 className="text-lg font-semibold leading-6 text-gray-900 ">
                  {editSkill ? "Update Skill" : "Create Skill"}
                </h3>
                <div className="flex flex-col mx-auto gap-2 mt-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    defaultValue={editSkill?.name}
                    required
                    className="border-2 p-2"
                  />
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    defaultValue={editSkill?.description}
                    required
                    className="border-2 p-2"
                  />
                </div>
              </div>
              <div className="bg-gray-50 py-3 flex flex-row-reverse px-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                  {editSkill ? "Update " : "Create "}
                </button>
                <button
                  onClick={async () => {
                    setShowDialog(!showDialog);
                    setEditSkill(null);
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
      <div className={`${showDeleteModal ? "relative" : "hidden"} z-10`}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-lg">
              <div className="bg-white p-6 pb-4">
                <h3 className="text-lg font-semibold leading-6 text-gray-900 ">
                  Delete Skill
                </h3>
                <div className="mt-2">
                  {`Are you sure want to delete (${editSkill?.name}) skill?`}
                </div>
              </div>
              <div className="bg-gray-50 py-3 flex flex-row-reverse px-6">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => {
                    startTransition(() => {
                      handleDeleteSkill(editSkill?.id);
                    });
                  }}
                  className={`inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-400 sm:ml-3 sm:w-auto`}
                >
                  {isPending ? "Loading..." : "Delete"}
                </button>
                <button
                  onClick={async () => {
                    setShowDeleteModal(false);
                    setEditSkill(null);
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
