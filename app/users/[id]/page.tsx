import React from "react";
import { getUser } from "../../actions/userActions";
import getCurrentUser from "../../actions/getCurrentUser";
import CreateExchangeBtn from "../../../components/CreateExchangeBtn";
import FormCreateExchangeModal from "../../../components/FormCreateExchangeModal";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);
  const currentUser = await getCurrentUser();

  return (
    <main className="flex flex-col p-2 gap-3 items-start">
      <div className="flex flex-col gap-0.5">
        <h1 className="font-medium text-lg">Username: </h1>
        <div>{user?.username}</div>
      </div>
      <div className="flex flex-col gap-0.5">
        <h1 className="font-medium text-lg">Offer Skills:</h1>
        <ul className="list-disc">
          {user?.offerSkills.length ? (
            user?.offerSkills.map((skill: any) => {
              return (
                <li key={skill.id} className="list-inside text-md">
                  {skill?.name}
                </li>
              );
            })
          ) : (
            <div>Offer skills not found</div>
          )}
        </ul>
      </div>
      <div className="flex flex-col gap-0.5">
        <h1 className="font-medium text-lg">Request Skills:</h1>
        <ul className="list-disc">
          {user?.requestSkills.length ? (
            user?.requestSkills.map((skill: any) => {
              return (
                <li key={skill.id} className="list-inside text-md">
                  {skill?.name}
                </li>
              );
            })
          ) : (
            <div>Request skills not found</div>
          )}
        </ul>
      </div>
      <FormCreateExchangeModal user={user} currentUser={currentUser} />
    </main>
  );
}
