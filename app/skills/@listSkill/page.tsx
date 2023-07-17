import React from "react";
import SearchForm from "../../../components/SearchForm";
import { getAllSkills } from "../../actions/skillActions";
import AddOfferSkillBtn from "../../../components/AddOfferSkillBtn";
import PaginationNumber from "../../../components/PaginationNumber";
import AddRequestSkillBtn from "../../../components/AddRequestSkillBtn";

export default async function ListSkill({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const { skills, totalPage }: { skills: any; totalPage: number } =
    await getAllSkills(searchParams);
  return (
    <>
      <h1 className="text-2xl font-bold">Find Skills</h1>
      <SearchForm />
      <h1 className="text-xl font-semibold mt-3 mb-1">List Skill </h1>
      <div className="flex flex-col gap-3 h-[calc(100vh/3.4)]">
        {skills !== undefined ? (
          skills.map((skill: any) => {
            return (
              <div key={skill.id} className="flex justify-between items-center">
                <div className="flex flex-col">
                  <div className="font-medium">{skill.name}</div>
                  <div className="text-sm text-gray-600">
                    {skill.description}
                  </div>
                </div>
                <div className="flex gap-2">
                  <AddOfferSkillBtn skill={skill} />
                  <AddRequestSkillBtn skill={skill} />
                </div>
              </div>
            );
          })
        ) : (
          <div>Skill not found</div>
        )}
      </div>
      <PaginationNumber totalPages={totalPage} />
    </>
  );
}
