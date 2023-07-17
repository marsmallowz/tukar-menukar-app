import React from "react";
import { getUser } from "../../actions/userActions";
import getCurrentUser from "../../actions/getCurrentUser";
import CreateExchangeBtn from "../../../components/CreateExchangeBtn";
import FormCreateExchangeModal from "../../../components/FormCreateExchangeModal";
import Image from "next/image";

export default async function Page({ params }: { params: { id: string } }) {
  const { user, userRating } = await getUser(params.id);
  const currentUser = await getCurrentUser();

  return (
    <main className="flex flex-col p-2 gap-3 items-start">
      <Image
        src={
          user?.profileImage !== null
            ? user?.profileImage!
            : "/profile-image-default.png"
        }
        alt="profile image"
        width={250}
        height={250}
        className="rounded-full"
      />
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
      <div className="flex flex-col gap-0.5">
        <h1 className="font-medium text-lg">Rate: </h1>
        <div>
          {user?.reviewed.length ? `${userRating}/5` : "Belum dapat ditentukan"}
        </div>
      </div>
      <div className="flex flex-col gap-0.5 w-full">
        <h1 className="font-medium text-lg">Reviews: </h1>
        {user?.reviewed.length ? (
          <div className="flex flex-col divide-y-2 gap-4">
            {user?.reviewed.map((review) => {
              return (
                <>
                  <div key={review.id} className="flex flex-col gap-1">
                    <div className="flex justify-between">
                      <div>{review.skill.name}</div>
                      <div>Rating {review.rating}/5</div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {review.comment}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        ) : (
          <div>Review tidak ditemukan</div>
        )}
      </div>
      {/* <div className="flex flex-col gap-0.5 w-full ">
        <h1 className="font-medium text-lg">Current Exchanges: </h1>
        {exchange.length ? (
          <div className="flex flex-col divide-y-2">
            {exchange.map((exchange) => {
              return (
                <div key={exchange.id} className="flex justify-between py-2">
                  <div>{exchange.id}</div>
                  <div>{exchange.status}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>Exchanges not found</div>
        )}
      </div> */}
      <FormCreateExchangeModal user={user} currentUser={currentUser} />
    </main>
  );
}
