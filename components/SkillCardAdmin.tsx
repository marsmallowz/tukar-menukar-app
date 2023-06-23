"use client";

import React from "react";
import { useMyContext } from "../context/Provider";

interface SkillCardAdminProps {
  skill: Skill;
}

interface Skill {
  id: string;
  name: string;
  description: string;
}

export default function SkillCardAdmin({ skill }: SkillCardAdminProps) {
  const { setEditSkill, setShowDialog, setShowDeleteModal } = useMyContext();
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <div className="font-medium">{skill.name}</div>
        <div className="text-sm text-gray-600">{skill.description}</div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => {
            setEditSkill(skill);
            setShowDialog(true);
          }}
          className="p-2"
        >
          Edit
        </button>
        <button
          onClick={async () => {
            setEditSkill(skill);
            setShowDeleteModal(true);
          }}
          className="p-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
