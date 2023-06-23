"use client";

import React from "react";
import { useSkillModalContext } from "../context/SkillModalProvider";

export default function AddRequestSkillBtn({ skill }: { skill: any }) {
  const { setMode, setSkill } = useSkillModalContext();

  return (
    <button
      onClick={(e) => {
        setMode("AddRequest");
        setSkill(skill);
      }}
      className="p-2"
    >
      Request
    </button>
  );
}
