"use client";

import React from "react";
import { useSkillModalContext } from "../context/SkillModalProvider";

export default function AddOfferSkillBtn({ skill }: { skill: any }) {
  const { setMode, setSkill } = useSkillModalContext();
  return (
    <button
      onClick={() => {
        setMode("AddOffer");
        setSkill(skill);
      }}
      className="p-2"
    >
      Offer
    </button>
  );
}
