import React from "react";
import { getExchange } from "../../actions/exchangeActions";
import getCurrentUser from "../../actions/getCurrentUser";
import FormAcceptExchangeModal from "../../../components/FormAcceptExchangeModal";
import { getUser } from "../../actions/userActions";

export default async function Page({ params }: { params: { id: string } }) {
  const exchange = await getExchange(params.id);
  const user = await getUser(exchange?.offeredUserId as string);
  const currentUser = await getCurrentUser();
  return (
    <main className="flex flex-col p-2 gap-3 items-start">
      <div className="flex flex-col gap-0.5">
        <h1 className="font-medium text-lg">Status: </h1>
        <div>{exchange?.status}</div>
      </div>
      <div className="flex flex-col gap-0.5">
        <h1 className="font-medium text-lg">From: </h1>
        <div>{exchange?.offeredUser.username}</div>
      </div>
      <div className="flex flex-col gap-0.5">
        <h1 className="font-medium text-lg">To: </h1>
        <div>{exchange?.requestedUser.username}</div>
      </div>
      <div className="flex flex-col gap-0.5">
        <h1 className="font-medium text-lg">Offer Skills:</h1>
        {exchange?.skillOffered?.id === undefined
          ? "Offered Skill Not Found"
          : exchange?.skillOffered?.name}
      </div>
      <div className="flex flex-col gap-0.5">
        <h1 className="font-medium text-lg">Request Skills:</h1>
        <div>
          {exchange?.skillRequested === undefined
            ? "Requested Skill Not Found"
            : exchange?.skillRequested.name}
        </div>
      </div>
      <FormAcceptExchangeModal
        exchange={exchange}
        currentUser={currentUser}
        offerSkills={user?.offerSkills}
      />
    </main>
  );
}
