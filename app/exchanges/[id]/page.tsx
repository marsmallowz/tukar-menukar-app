import React from "react";
import { getExchange } from "../../actions/exchangeActions";
import getCurrentUser from "../../actions/getCurrentUser";
import FormAcceptExchangeModal from "../../../components/FormAcceptExchangeModal";
import { getUser } from "../../actions/userActions";
import FormCreateReviewModal from "../../../components/FomCreateReviewModal";

export default async function Page({ params }: { params: { id: string } }) {
  const exchange = await getExchange(params.id);
  const { user } = await getUser(exchange?.offeredUserId as string);
  const currentUser = await getCurrentUser();
  console.log(exchange);
  console.log(currentUser);
  console.log(exchange?.reviews);

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
          ? "Offered skill not set yet"
          : exchange?.skillOffered?.name}
      </div>
      <div className="flex flex-col gap-0.5">
        <h1 className="font-medium text-lg">Request Skills:</h1>
        <div>
          {exchange?.skillRequested === undefined
            ? "Requested skill not set yet"
            : exchange?.skillRequested.name}
        </div>
      </div>
      <div className="flex flex-col gap-0.5 w-full">
        <h1 className="font-medium text-lg">Reviews:</h1>
        {exchange?.reviews.length ? (
          exchange?.reviews.map((review: any) => {
            return (
              <div key={review.id}>
                <div className="flex justify-between gap-2">
                  <div>{review.review.username}</div>
                  <div>Rating {review.rating}/5</div>
                </div>
                <div className="text-sm text-gray-500">{review.comment}</div>
              </div>
            );
          })
        ) : (
          <div>Reviews not found</div>
        )}
      </div>
      <FormAcceptExchangeModal
        exchange={exchange}
        currentUser={currentUser}
        offerSkills={user?.offerSkills}
      />
      <FormCreateReviewModal exchange={exchange} currentUser={currentUser} />
    </main>
  );
}
