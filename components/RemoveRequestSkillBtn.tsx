"use client";
import React from "react";
import { useSkillModalContext } from "../context/SkillModalProvider";

export default function RemoveRequestSkillBtn({ skill }: { skill: any }) {
  const { setMode, setSkill } = useSkillModalContext();

  return (
    <button
      onClick={async () => {
        setMode("RemoveRequest");
        setSkill(skill);
      }}
      className="mr-2"
    >
      Remove
    </button>
  );
}
