import React from "react";
import { SkillModalProvider } from "../../context/SkillModalProvider";

export default async function SkillLayout({
  children,
  listSkill,
  offerSkills,
  requestSkills,
}: {
  children: React.ReactNode;
  listSkill: React.ReactNode;
  offerSkills: React.ReactNode;
  requestSkills: React.ReactNode;
}) {
  return (
    <SkillModalProvider>
      <section>
        {children}
        {listSkill}
        {offerSkills}
        {requestSkills}
      </section>
    </SkillModalProvider>
  );
}
