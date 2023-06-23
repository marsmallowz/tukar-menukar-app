import React from "react";
import AddOfferSkillBtn from "./AddOfferSkillBtn";

interface SkillCardProps {
  skill: Skill;
}

interface Skill {
  id: string;
  name: string;
  description: string;
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <div key={skill.id} className="flex justify-between items-center">
      <div className="flex flex-col">
        <div className="font-medium">{skill.name}</div>
        <div className="text-sm text-gray-600">{skill.description}</div>
      </div>
      <div className="flex gap-2">
        <AddOfferSkillBtn skill={skill} />
        <button className="p-2">Request</button>
      </div>
    </div>
  );
}
