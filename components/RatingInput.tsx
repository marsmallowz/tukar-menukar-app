import React from "react";

function RatingInput({ value, onChange }: any) {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`cursor-pointer ${
            i <= value ? "text-yellow-400 text-3xl" : "text-gray-300 text-3xl"
          }`}
          onClick={() => onChange(i)}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return <div>{renderStars()}</div>;
}

export default RatingInput;
