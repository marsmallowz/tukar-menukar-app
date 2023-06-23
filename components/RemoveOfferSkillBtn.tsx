"use client";

import React from "react";
import { useSkillModalContext } from "../context/SkillModalProvider";

export default function RemoveOfferSkillBtn({ skill }: { skill: any }) {
  const { setMode, setSkill } = useSkillModalContext();

  return (
    <button
      onClick={async () => {
        setMode("RemoveOffer");
        setSkill(skill);
      }}
      className="mr-2"
    >
      Remove
    </button>
  );
}
