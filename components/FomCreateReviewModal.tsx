"use client";

import React, { useRef, useState, useTransition } from "react";
import RatingInput from "./RatingInput";
import createReview from "../app/actions/reviewActions";

export default function FormCreateReviewModal({ exchange, currentUser }: any) {
  const formRef = useRef<any>(null);
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value: number) => {
    setRating(value);
  };
  async function handleCreateReview(formData: any) {
    const exchangeId = exchange.id;
    const comment: string = formData.get("comment");

    await createReview({
      exchangeId: exchangeId,
      rating: rating,
      comment: comment,
    });

    await formRef.current.reset();
    setShowModal(false);
    setRating(0);
  }
  return (
    <div>
      <button
        onClick={() => {
          setShowModal(!showModal);
        }}
        disabled={
          exchange.status !== "COMPLETED" ||
          exchange.reviews.some(
            (review: any) => review.reviewId === currentUser.id
          )
        }
        className="text-white font-medium bg-gray-500 px-3 py-2 hover:bg-gray-600 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        Review
      </button>
      <div className={`${showModal ? "relative" : "hidden"} z-10`}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <form
              action={handleCreateReview}
              ref={formRef}
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-lg"
            >
              <div className="bg-white p-6 pb-4">
                <h3 className="text-lg font-semibold leading-6 text-gray-900 ">
                  Create Review
                </h3>
                <div className="flex flex-col mx-auto gap-2 mt-2">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Exchange Id
                    </label>
                    <div className="mt-1 ">
                      <input
                        type="text"
                        defaultValue={exchange.id}
                        required
                        className="border-2 p-2 w-full"
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="rating"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Rating
                    </label>
                    <div className="mt-1">
                      <RatingInput
                        value={rating}
                        onChange={handleRatingChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="comment"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Comment
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="comment"
                        name="comment"
                        required
                        className="border-2 p-2 w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 py-3 flex flex-row-reverse px-6">
                <button
                  type="submit"
                  className="mt-3 ml-3 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:mt-0 sm:w-auto"
                >
                  Create
                </button>
                <button
                  onClick={async () => {
                    setShowModal(!showModal);
                    setRating(0);
                    await formRef.current.reset();
                  }}
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
