"use client";
import React from "react";
import useCustomeRouter from "../hooks/useCustomRouter";

const PaginationNumber = (props: any) => {
  const pageNumbers = [];
  const { pushQuery, query } = useCustomeRouter();

  if (props.totalPages <= 5) {
    for (let i = 1; i <= props.totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (query.page <= 3) {
      for (let i = 1; i <= 5; i++) {
        pageNumbers.push(i);
      }
    } else if (query.page >= props.totalPages - 2) {
      for (let i = props.totalPages - 4; i <= props.totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      for (let i = query.page - 2; i <= query.page + 2; i++) {
        pageNumbers.push(i);
      }
    }
  }

  return (
    <div className="flex justify-center mt-4 gap-2 ">
      {query.page === undefined
        ? pageNumbers.map((number) => {
            if (number === 1) {
              return (
                <button
                  key={number}
                  onClick={() => {
                    pushQuery({ page: number });
                  }}
                  className={`px-3 py-1 rounded-md bg-slate-400 `}
                >
                  {number}
                </button>
              );
            } else {
              return (
                <button
                  key={number}
                  onClick={() => {
                    pushQuery({ page: number });
                  }}
                  className={`px-3 py-1 rounded-md bg-slate-200`}
                >
                  {number}
                </button>
              );
            }
          })
        : pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => {
                pushQuery({ page: number });
              }}
              className={`px-3 py-1 rounded-md ${
                query.page === number ? "bg-slate-400" : "bg-slate-200"
              }`}
            >
              {number}
            </button>
          ))}
    </div>
  );
};

export default PaginationNumber;
