import React from "react";
import { getAllSkillOffer } from "../../actions/skillOffersActions";
import RemoveOfferSkillBtn from "../../../components/RemoveOfferSkillBtn";

export default async function Page() {
  const { offerSkills } = await getAllSkillOffer();
  return (
    <>
      <h2 className="text-xl font-medium mt-5">Offer skills</h2>
      <div className="flex flex-col gap-1">
        {offerSkills.length ? (
          offerSkills.map((skill: any) => {
            return (
              <div key={skill.id} className="flex justify-between">
                <div>{skill.name}</div>
                <RemoveOfferSkillBtn skill={skill} />
              </div>
            );
          })
        ) : (
          <div>Kosong</div>
        )}
      </div>
    </>
  );
}
